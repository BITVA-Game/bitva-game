const ipcRenderer = { send: jest.fn(), on: jest.fn() };
const electron = { ipcRenderer };
global.require = jest.fn().mockReturnValue(electron);

export default electron;
