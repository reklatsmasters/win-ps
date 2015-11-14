# win-ps
>Process list in windows

### Install
```
npm i win-ps
```

This module required `powershell@3` or above.

### API

#### `.snapshot([fields])`
Return array with info of each runned process.

###### param `fields` Array
Array of fields to select. Default fields is `ProcessId,Name,Path,ParentProcessId,Priority`. Full list of avalable fields see below.
###### return Promise

##### example
```js
const ps = require('win-ps');

ps.snapshot().then((list) => {/* ... */})
```

### Fields

```
Handles
ProcessName
PSComputerName
VM
WS
Caption
CommandLine
CreationClassName
CreationDate
CSCreationClassName
CSName
Description
ExecutablePath
ExecutionState
Handle
HandleCount
InstallDate
KernelModeTime
MaximumWorkingSetSize
MinimumWorkingSetSize
Name
OSCreationClassName
OSName
OtherOperationCount
OtherTransferCount
PageFaults
PageFileUsage
ParentProcessId
PeakPageFileUsage
PeakVirtualSize
PeakWorkingSetSize
Priority
PrivatePageCount
ProcessId
QuotaNonPagedPoolUsage
QuotaPagedPoolUsage
QuotaPeakNonPagedPoolUsage
QuotaPeakPagedPoolUsage
ReadOperationCount
ReadTransferCount
SessionId
Status
TerminationDate
ThreadCount
UserModeTime
VirtualSize
WindowsVersion
WorkingSetSize
WriteOperationCount
WriteTransferCount
Path
```

See [Win32_Process class][msdn]

### Supports
nodejs  **>=4**

### License
MIT, 2015 (c) Dmitry Tsvettsikh

[msdn]: https://msdn.microsoft.com/en-us/library/aa394372(v=vs.85).aspx
