const ctx = document.getElementById('lactateChart').getContext('2d');

const datasets = [
  {
    type: 'scatter',
    label: 'blood samples',
    data: JSON.parse(lacate_samples),
    borderColor: '#00000000',
    backgroundColor: '#87CEEBFF',
    borderWidth: 1,
    yAxisID: 'y',
    radius: 3,
  },
  {
    type: 'line',
    label: 'fitted curve',
    data: JSON.parse(fitted),
    borderColor: '#87CEEBFF',
    borderWidth: 2,
    fill: false,
    radius: 0,
    tension: 0.1,
    yAxisID: 'y',
  },
  {
    type: 'line',
    label: 'fitted curve',  // just reusing a label to ignore
    data: [{ "x": 50, "y": 2 }, { "x": 180, "y": 2 }],  // horizontal line at 2mmol/L
    borderColor: '#00000050',
    borderWidth: 2,
    fill: false,
    radius: 0,
    tension: 0.0,
    borderDash: [10, 5],
    yAxisID: 'y',
  },
  {
    type: 'line',
    label: 'AeT',
    data: JSON.parse(aet_kde),
    borderColor: '#0000FFFF',
    backgroundColor: '#0000FF99',
    borderWidth: 0,
    fill: true, // fill the area under the curve
    tension: 0.1, // Adjust curve smoothness (0 for straight lines)
    radius: 0,
    yAxisID: 'y1',
  }
];

for (let i = 0; i <= 30; i += 1) {
  const ds = {
    type: 'line',
    label: 'fitted curve',
    data: JSON.parse(fitted_samples)[i],
    borderColor: '#87CEEB20',
    borderWidth: 2,
    fill: false,
    radius: 0,
    tension: 0.1,
    yAxisID: 'y',
    tooltip: false
  };
  datasets.push(ds);
}

const data = {
  datasets: datasets
};

const config = {
  data: data,
  options: {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        filter: function (tooltipItem) {
          return [0, 1].includes(tooltipItem.datasetIndex);
        },
      },
      legend: {
        display: true,
        labels: {
          filter: item => item.text !== 'fitted curve'
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Heart rate (bpm)'
        },
        type: "linear",
        grid: {
          display: true
        },
        ticks: {
          stepSize: 10,
          maxRotation: 0,
          minRotation: 0,
          precision: 0
        }
      },
      y: {
        title: {
          display: true,
          text: "Lactate (mmol/L)"
        },
        type: "linear",
        position: 'left',
        grid: {
          display: false
        },
      },
      y1: {
        type: 'linear',
        position: 'right',
        display: false,
      }
    }
  }
};

Chart.defaults.font.family = "Roboto";
const lactateChart = new Chart(ctx, config);