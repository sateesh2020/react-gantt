# React Gantt

A React and D3 Plugin to render Gantt Chart.

## Sample Data 

```sh
[
  {
    id: "999e8ab",
    versionNumber: 1.0,
    startDate: new Date("2018-02-28"),
    endDate: new Date("2018-04-26"),
    taskName: "IOS Development",
    description: "Sprint 5",
    color: "#BA68C8",
    percentageCompleted: 80.0,
  },
  {
    id: "16c0013",
    versionNumber: 0.95,
    startDate: new Date("2018-01-31"),
    endDate: new Date("2018-02-27"),
    taskName: "IOS Development",
    description: "Sprint 6",
    color: "#BA68C8",
    percentageCompleted: 100.0,
    
  },
  {
    id: "4a16c13",
    versionNumber: 0.95,
    startDate: new Date("2018-01-31"),
    endDate: new Date("2018-02-27"),
    taskName: "Android Development",
    description: "Sprint 6",
    color: "#BA68C8",
    percentageCompleted: 100.0,
  }
]

```

### Mandatory Keys in every JSON object

* versionNumber
* startDate
* endDate
* taskName
* description
* color
* percentageCompleted


### Features

* Multicolor supportby providing through color key.
* Milestone representation based on the versioning.
* Bar fill based on the percentage completed.

### Dependencies

* D3
* React 
* React DOM
