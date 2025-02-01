const triggerEvent = ({ data, id, frameSelector }) => {
  return new Promise((resolve, reject) => {
    // handleSelector(
    //   { data, id, frameSelector },
    //   {
    //     async onSelected(element) {
    //       console.log('🚀 ~ onSelected ~ element:', element);
    //     },
    //     onSuccess() {
    //       console.log('🚀 ~ onSelected ~ success:');
    //     },
    //     onError(error) {
    //       reject(error);
    //     },
    //   }
    // );

    resolve('success');
  });
};

export default triggerEvent;
