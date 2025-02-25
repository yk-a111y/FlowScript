import cloneDeep from 'lodash.clonedeep';
import { customAlphabet } from 'nanoid/non-secure';

const nanoid = customAlphabet('1234567890abcdef', 5);

const getAutomaScript = ({ varName, refData, everyNewTab, isEval = false }) => {
  let str = `
const ${varName} = ${JSON.stringify(refData)};
${automaRefDataStr(varName)}
function automaSetVariable(name, value) {
  const variables = ${varName}.variables;
  if (!variables) ${varName}.variables = {}

  ${varName}.variables[name] = value;
}
function automaNextBlock(data, insert = true) {
  if (${isEval}) {
    $automaResolve({
      columns: {
        data,
        insert,
      },
      variables: ${varName}.variables,
    });
  } else{
    document.body.dispatchEvent(new CustomEvent('__automa-next-block__', { detail: { data, insert, refData: ${varName} } }));
  }
}
function automaResetTimeout() {
  if (${isEval}) {
    clearTimeout($automaTimeout);
    $automaTimeout = setTimeout(() => {
      resolve();
    }, $automaTimeoutMs);
  } else {
    document.body.dispatchEvent(new CustomEvent('__automa-reset-timeout__'));
  }
}
function automaFetch(type, resource) {
  return (${automaFetchClient.toString()})('${varName}', { type, resource });
}
  `;

  if (everyNewTab) str = automaRefDataStr(varName);

  return str;
};

async function javascriptCode(blockData, { refData }) {
  console.log('🚀 ~ javascriptCode ~ blockData:', blockData);
  console.log('🚀 ~ javascriptCode ~ refData:', refData);
  const { outputs, data, ...block } = blockData;

  const nextBlockId = this.getBlockConnections(block.id);

  if (data.everyNewTab) {
    const isScriptExist = this.preloadScripts.some(({ id }) => id === block.id);

    if (!isScriptExist)
      this.preloadScripts.push({ id: block.id, data: cloneDeep(data) });
    if (!this.activeTab.id) return { data: '', nextBlockId };
  } else if (!this.activeTab.id && data.context !== 'background') {
    throw new Error('no-tab');
  }

  const payload = {
    ...block,
    data,
    refData: { variables: {} },
    frameSelector: this.frameSelector,
  };
  if (data.code.includes('automaRefData')) {
    const newRefData = {};
    Object.keys(refData).forEach((keyword) => {
      if (!data.code.includes(keyword)) return;

      newRefData[keyword] = refData[keyword];
    });

    payload.refData = { ...newRefData, secrets: {} };
  }

  const instanceId = `automa${nanoid()}`;
  const automaScript =
    data.everyNewTab && (!data.context || data.context !== 'background')
      ? ''
      : getAutomaScript({
          varName: instanceId,
          refData: payload.refData,
          everyNewTab: data.everyNewTab,
        });

  return {
    nextBlockId,
    data: result?.columns.data || {},
  };
}

export default javascriptCode;
