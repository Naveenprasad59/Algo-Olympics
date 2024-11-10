// export default class WebWorker {
//   constructor(worker: () => void) {
//     const code = worker.toString();
//     const blob = new Blob(['(' + code + ')()']);
//     return new Worker(URL.createObjectURL(blob));
//   }
// }
export const createWebWorker = (worker: () => void) => {
  const code = worker.toString();
  const blob = new Blob(['(' + code + ')()']);
  return new Worker(URL.createObjectURL(blob));
};
