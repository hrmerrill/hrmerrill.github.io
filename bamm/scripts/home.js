const ctx = document.getElementById('myChart').getContext('2d');

// Function to calculate normal distribution probability density
function normalDistribution(x, mean, stdDev) {
  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  return coefficient * Math.exp(exponent);
}

const LTmean = 168;
const LTstdDev = 4;
const LTprior = [];

const Maxmean = 189; 
const MaxstdDev = 3;
const Maxprior = [];

const labels = [];

// Generate data points for the chart
const startX = 90;
const endX = 210;
const step = 2; // Adjust for smoother or coarser curve

for (let x = startX; x <= endX; x += step) {
  const y = normalDistribution(x, Maxmean, MaxstdDev);
  const z = normalDistribution(x, LTmean, LTstdDev);
  Maxprior.push(y);
  LTprior.push(z);
  labels.push(x.toFixed(0)); // Format x-axis labels to 0 decimal place
}

Chart.defaults.font.family = "Roboto";
const myChart = new Chart(ctx, {
  type: 'line', // Use a line chart for smooth curve
  data: {
    labels: labels, // X-axis values
    datasets: [
      {
        label: 'AeT',
        data: JSON.parse(aet_kde), // Y-axis values (probabilities)
        borderColor: '#00000000',
        backgroundColor: '#0000FF99',
        borderWidth: 1,
        fill: true, // fill the area under the curve
        tension: 0.4 // Adjust curve smoothness (0 for straight lines)
      },
      {
        label: 'LT',
        data: LTprior, // Y-axis values (probabilities)
        borderColor: '#00000000',
        backgroundColor: '#00FF0099',
        borderWidth: 1,
        fill: true, // fill the area under the curve
        tension: 0.4 // Adjust curve smoothness (0 for straight lines)
      },
      {
        label: 'Max',
        data: Maxprior, // Y-axis values (probabilities)
        borderColor: '#00000000',
        backgroundColor: '#FFFF0099',
        borderWidth: 1,
        fill: true, // fill the area under the curve
        tension: 0.4 // Adjust curve smoothness (0 for straight lines)
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      point:{
        radius: 0
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
        display: false,
        title: {
          display: false,
          text: 'Probability Density'
        },
        grid: {
          display: false
        },
        ticks: {
          callback: function(val, index) {
            return ""; // No y-axis ticks
          }
        },
        beginAtZero: false
      }
    }
  }
});