//Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";




let data = {};
let selDataset = d3.select("#selDataset");

d3.json(url).then(   // this is my "innit()"
        function(response) {
            data = response;         // this brings all the https://.../samples.json in which is where we have our data
            populateDropdown();
  
            updateDashboard(data.names[0]);
           }
);

function populateDropdown() {
    data.names.forEach(
        function(val) {
            selDataset.append("option").attr("value", val).text(val); 
        }
    );
       
    selDataset.on("change", function() {
        let newSelection =  this.value;
            updateDashboard(newSelection);
    });
}
    



function updateDemographicInfo(metadata) {
    let demographicInfoDiv = d3.select("#sample-metadata");
        console.log(metadata);
    demographicInfoDiv.html(
        `id: ${metadata.id} <br>
         ethnicity: ${metadata.ethnicity}<br>
         gender: ${metadata.gender} <br>
         age: ${metadata.age}<br>
         location: ${metadata.location}<br>
         bbtype: ${metadata.bbtype}<br>
         wfreq: ${metadata.wfreq}
        `
    );
}


function updateDashboard(selectedItem) {
    //now i know that data (line 3 from line ) is fully populated
    console.log(data);
    let samples = data.samples;
    let arrayIndex = data.names.findIndex(val => val == selectedItem);

    let otu_ids = samples[arrayIndex].otu_ids; 
    let otu_labels = samples[arrayIndex].otu_labels; 
    let sample_values = samples[arrayIndex].sample_values;
    let metadata = data.metadata[arrayIndex];
    updateDemographicInfo(metadata);
    plotBarChart(otu_ids, otu_labels, sample_values);
    plotBubbleChart(otu_ids, otu_labels, sample_values);
};





function plotBarChart(otu_ids, otu_labels, sample_values) {
        let trace = {
            x: sample_values.slice(0, 10), 
            y: otu_ids.map(id => `OTU ${id}`).slice(0, 10),
            type: "bar",
            orientation: "h",
            text: otu_labels.slice(0, 10),
            hoverinfo: "text"
        };
    
        let traceData = [trace];

        let layout = {
            width: 500,
            height: 400,
            yaxis: {
                autorange: "reversed"
            }
        };
        

        Plotly.newPlot("bar", traceData, layout);
}







function plotBubbleChart(otu_ids, otu_labels, sample_values) {
        
        let trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'  // You can choose other color scales as well
            }
        };

        let traceData = [trace];


        let layout = {
            xaxis: { title: "OTU ID" }
        };
      
        Plotly.newPlot("bubble", traceData, layout);
}


