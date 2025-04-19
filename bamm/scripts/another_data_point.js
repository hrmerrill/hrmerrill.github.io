const ctx = document.getElementById('aetChart').getContext('2d');

// Function to calculate normal distribution probability density
function normalDistribution(x, mean, stdDev) {
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
    const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
    return coefficient * Math.exp(exponent);
}

const AeTmean = 130;
const AeTstdDev = 5;
const AeTprior = [];
const labels = [];

const AeTmean2 = 145.33;
const AeTstdDev2 = 2.89;
const AeTposterior = [];

// Generate data points for the chart
const startX = 110;
const endX = 170;
const step = 1; // Adjust for smoother or coarser curve

for (let x = startX; x <= endX; x += step) {
  const y = normalDistribution(x, AeTmean, AeTstdDev);
  AeTprior.push(y);
  labels.push(x.toFixed(0)); // Format x-axis labels to 0 decimal place
}
for (let x = startX; x <= endX; x += step) {
  const y = normalDistribution(x, AeTmean2, AeTstdDev2);
  AeTposterior.push(y);
}

Chart.defaults.font.family = "Roboto";
const aetChart = new Chart(ctx, {
  type: 'line', // Use a line chart for smooth curve
  data: {
    labels: labels, // X-axis values
    datasets: [
      {
        label: 'AeT Prior',
        data: AeTprior, // Y-axis values (probabilities)
        borderColor: '#00000000',
        backgroundColor: '#87CEEB99',
        borderWidth: 1,
        fill: true, // fill the area under the curve
        tension: 0.4 // Adjust curve smoothness (0 for straight lines)
      },
      {
        label: 'AeT Posterior',
        data: AeTposterior, // Y-axis values (probabilities)
        borderColor: '#00000000',
        backgroundColor: '#0000FF99',
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
        display: false
      }
    }
  }
});