
var tabledata = [{
    id: 1,
    name: "X",
    progress: 86,
    startdate: "12/08/2021",
    enddate: "13/08/2021",
    createdat: "13:00",
}, {
    id: 2,
    name: "Y",
    progress: 55,
    startdate: "13/08/2021",
    enddate: "14/08/2021",
    createdat: "14:00",
}, {
    id: 3,
    name: "Z",
    progress: 31,
    startdate: "15/08/2021",
    enddate: "16/08/2021",
    createdat: "15:00",
},
];
var table = new Tabulator("#table", {
    data: tabledata,
    layout:"fitColumns",
    tooltips: true,
    resizableColumns: false,
    tooltipsHeader: false,
    columns: [
        {title:"ID", field:"id", frozen:true},
        {title:"Name", field:"name"},
        {title:"Work Done (in hrs)", field:"progress",sorter: "number", formatter: "progress"},
        {title:"Start Date", field:"startdate"},
        {title:"End Date", field:"enddate"},
        {title:"Created At", field:"createdat", frozen:true,},
    ],
});