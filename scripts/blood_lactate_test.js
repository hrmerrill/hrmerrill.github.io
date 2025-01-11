const ctx = document.getElementById('lactateChart').getContext('2d');

// To-do: get samples and lines

const data = {
    datasets: [
        {
            type: 'scatter',
            label: 'blood samples',
            data: samples,
            borderColor: '#00000000',
            backgroundColor: '#0000FF99',
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'fitted curve',
            data: lines,
            borderColor: '#00000000',
            borderWidth: 2,
            fill: false,
            radius: 0,
            tension: 0.4
        }
    ]
};

const config = {
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Heart rate (bpm)'
            },
            type: "linear",
            grid: {
                display: false
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
            grid: {
                display: false
            },
          }
        }
      }
};

Chart.defaults.font.family = "Roboto";
const lactateChart = new Chart(ctx, config);