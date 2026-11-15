const {contextBridge,ipcRenderer}=require('electron');
const invoke=(name,...args)=>ipcRenderer.invoke('browser:'+name,...args);
contextBridge.exposeInMainWorld('browser',{
 command:(name,...args)=>invoke(name,...args),
 onState:(callback)=>{const handler=(_e,data)=>callback(data);ipcRenderer.on('browser:state',handler);return ()=>ipcRenderer.removeListener('browser:state',handler)},
 onEvent:(callback)=>{const handler=(_e,data)=>callback(data);ipcRenderer.on('browser:event',handler);return ()=>ipcRenderer.removeListener('browser:event',handler)}
});
