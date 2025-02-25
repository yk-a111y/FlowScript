const GeneralBlocks = {
  trigger: {
    name: 'Trigger',
    description: 'Block where workflow will start executing',
    icon: 'RiFlashlightLine',
    component: 'BlockBasic',
    editComponent: 'EditTrigger',
    category: 'general',
    inputs: 0,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    refDataKeys: ['url'],
    data: {
      label: 'trigger',
      disableBlock: false,
      description: '',
      type: 'manual',
      interval: 60,
      delay: 5,
      date: '',
      time: '00:00',
      url: '',
      shortcut: '',
      activeInInput: false,
      isUrlRegex: false,
      days: [],
      contextMenuName: '',
      contextTypes: [],
      parameters: [],
      preferParamsInTab: false,
      observeElement: {
        selector: '',
        baseSelector: '',
        matchPattern: '',
        targetOptions: {
          subtree: false,
          childList: true,
          attributes: false,
          attributeFilter: [],
          characterData: false,
        },
        baseElOptions: {
          subtree: false,
          childList: true,
          attributes: false,
          attributeFilter: [],
          characterData: false,
        },
      },
    },
  },
  'execute-workflow': {
    name: 'Execute workflow',
    description: '',
    icon: 'RiFlowChart',
    component: 'BlockBasic',
    category: 'general',
    editComponent: 'EditExecuteWorkflow',
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    refDataKeys: ['globalData'],
    data: {
      label: 'execute-workflow',
      disableBlock: false,
      executeId: '',
      workflowId: '',
      globalData: '',
      description: '',
      insertAllVars: false,
      insertAllGlobalData: false,
    },
  },
};

const BrowserBlocks = {
  cookie: {
    name: 'Cookie',
    description: 'Get, set, or remove cookies',
    icon: 'RiGameLine',
    editComponent: 'EditCookie',
    component: 'BlockBasic',
    category: 'browser',
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    refDataKeys: [
      'domain',
      'expirationDate',
      'path',
      'sameSite',
      'name',
      'url',
      'value',
      'jsonCode',
      'variableName',
    ],
    data: {
      label: 'cookie',
      disableBlock: false,
      description: '',
      type: 'get',
      jsonCode: '{\n\n}',
      useJson: false,
      getAll: false,
      domain: '',
      expirationDate: '',
      path: '',
      sameSite: '',
      name: '',
      url: '',
      value: '',
      httpOnly: false,
      secure: false,
      session: false,
      assignVariable: false,
      variableName: '',
      saveData: true,
      dataColumn: '',
    },
  },
  'active-tab': {
    name: 'Active tab',
    description: "Set current tab that you're in as an active tab",
    icon: 'RiWindowLine',
    component: 'BlockBasic',
    category: 'browser',
    disableEdit: true,
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    data: {
      label: 'active-tab',
      disableBlock: false,
    },
  },
  'new-tab': {
    name: 'New tab',
    description: 'Create a new tab',
    icon: 'RiGlobalLine',
    component: 'BlockBasic',
    editComponent: 'EditNewTab',
    category: 'browser',
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    refDataKeys: ['url', 'userAgent'],
    data: {
      label: 'new-tab',
      disableBlock: false,
      description: '',
      url: '',
      userAgent: '',
      active: true,
      tabZoom: 1,
      inGroup: false,
      waitTabLoaded: false,
      updatePrevTab: false,
      customUserAgent: false,
    },
  },
  'switch-tab': {
    name: 'Switch tab',
    description: 'Switch active tab',
    icon: 'RiArrowLeftRightLine',
    component: 'BlockBasic',
    editComponent: 'EditSwitchTab',
    category: 'browser',
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    refDataKeys: ['url', 'matchPattern', 'tabTitle'],
    data: {
      label: 'switch-tab',
      disableBlock: false,
      description: '',
      url: '',
      tabIndex: 0,
      tabTitle: '',
      matchPattern: '',
      activeTab: true,
      createIfNoMatch: false,
      findTabBy: 'match-patterns',
    },
  },
  'new-window': {
    name: 'New window',
    description: 'Create a new window',
    icon: 'RiWindow2Line',
    component: 'BlockBasic',
    editComponent: 'EditNewWindow',
    category: 'browser',
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    refDataKeys: ['url'],
    data: {
      label: 'new-window',
      disableBlock: false,
      description: '',
      top: 0,
      left: 0,
      width: 0,
      url: '',
      height: 0,
      type: 'normal',
      incognito: false,
      windowState: 'normal',
    },
  },
};

const InteractionBlocks = {
  'event-click': {
    name: 'Click element',
    icon: 'RiCursorLine',
    component: 'BlockBasic',
    editComponent: 'EditInteractionBase',
    category: 'interaction',
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    refDataKeys: ['selector'],
    data: {
      label: 'event-click',
      disableBlock: false,
      description: '',
      findBy: 'cssSelector',
      waitForSelector: false,
      waitSelectorTimeout: 5000,
      selector: '',
      markEl: false,
      multiple: false,
    },
  },
  'javascript-code': {
    name: 'JavaScript code',
    label: 'javascript-code',
    description: 'Execute your custom javascript code in a webpage',
    icon: 'RiCodeSSlashLine',
    component: 'BlockBasic',
    editComponent: 'EditJavascriptCode',
    category: 'interaction',
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    data: {
      label: 'javascript-code',
      disableBlock: false,
      description: '',
      timeout: 20000,
      context: 'website',
      code: 'console.log("Hello world!");\nautomaNextBlock()',
      preloadScripts: [],
      everyNewTab: false,
      runBeforeLoad: false,
    },
  },
  forms: {
    name: 'Forms',
    icon: 'RiInputCursorMove',
    description: 'Manipulate form(input, select, checkbox, and radio) element',
    component: 'BlockBasic',
    editComponent: 'EditForms',
    category: 'interaction',
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    refDataKeys: [
      'selector',
      'variableName',
      'value',
      'optionPosition',
      'delay',
    ],
    autocomplete: ['variableName'],
    data: {
      label: 'forms',
      disableBlock: false,
      description: '',
      findBy: 'cssSelector',
      waitForSelector: false,
      waitSelectorTimeout: 5000,
      selector: '',
      markEl: false,
      multiple: false,
      selected: true,
      clearValue: true,
      getValue: false,
      saveData: false,
      dataColumn: '',
      selectOptionBy: 'value',
      optionPosition: '1',
      assignVariable: false,
      variableName: '',
      type: 'text-field',
      value: '',
      delay: 0,
      events: [],
    },
  },
};

export const tasks = {
  ...GeneralBlocks,
  ...BrowserBlocks,
  ...InteractionBlocks,
};

export const categories = {
  general: {
    name: 'General',
    border: 'border-yellow-200 dark:border-yellow-300',
    color:
      'bg-yellow-200 dark:bg-yellow-300 fill-yellow-200 dark:fill-yellow-300',
  },
  browser: {
    name: 'Browser',
    border: 'border-orange-200 dark:border-orange-300',
    color:
      'bg-orange-200 dark:bg-orange-300 fill-orange-200 dark:fill-orange-300',
  },
  interaction: {
    name: 'Web interaction',
    border: 'border-green-200 dark:border-green-300',
    color: 'bg-green-200 dark:bg-green-300 fill-green-200 dark:fill-green-300',
  },
  onlineServices: {
    name: 'Online services',
    border: 'border-red-200 dark:border-red-300',
    color: 'bg-red-200 dark:bg-red-300 fill-red-200 dark:fill-red-300',
  },
  data: {
    name: 'Data',
    border: 'border-lime-200 dark:border-lime-300',
    color: 'bg-lime-200 dark:bg-lime-300 fill-lime-200 dark:fill-lime-300',
  },
  conditions: {
    name: 'Control flow',
    border: 'border-blue-200 dark:border-blue-300',
    color: 'bg-blue-200 dark:bg-blue-300 fill-blue-200 dark:fill-blue-300',
  },
  package: {
    name: 'Packages',
    border: 'border-cyan-200 dark:border-cyan-300',
    color: 'bg-cyan-200 dark:bg-cyan-300 fill-cyan-200 dark:fill-cyan-300',
  },
};

export const eventList = [
  { id: 'click', name: 'Click', type: 'mouse-event' },
  { id: 'dblclick', name: 'Double Click', type: 'mouse-event' },
  { id: 'mouseup', name: 'Mouseup', type: 'mouse-event' },
  { id: 'mousedown', name: 'Mousedown', type: 'mouse-event' },
  { id: 'mouseenter', name: 'Mouseenter', type: 'mouse-event' },
  { id: 'mouseleave', name: 'Mouseleave', type: 'mouse-event' },
  { id: 'mouseover', name: 'Mouseover', type: 'mouse-event' },
  { id: 'mouseout', name: 'Mouseout', type: 'mouse-event' },
  { id: 'mousemove', name: 'Mousemove', type: 'mouse-event' },
  { id: 'focus', name: 'Focus', type: 'focus-event' },
  { id: 'blur', name: 'Blur', type: 'focus-event' },
  { id: 'input', name: 'Input', type: 'input-event' },
  { id: 'change', name: 'Change', type: 'event' },
  { id: 'touchstart', name: 'Touch start', type: 'touch-event' },
  { id: 'touchend', name: 'Touch end', type: 'touch-event' },
  { id: 'touchmove', name: 'Touch move', type: 'touch-event' },
  { id: 'touchcancel', name: 'Touch cancel', type: 'touch-event' },
  { id: 'keydown', name: 'Keydown', type: 'keyboard-event' },
  { id: 'keyup', name: 'Keyup', type: 'keyboard-event' },
  { id: 'submit', name: 'Submit', type: 'submit-event' },
  { id: 'wheel', name: 'Wheel', type: 'wheel-event' },
];
