const ctx = document.getElementById("main_graph");

main_chart = new Chart(ctx, {
	type: "line",
	borderColor: "#FFFFFF",

	data: {
		labels: [],
		datasets: [{
			backgroundColor: "rgb(255, 99, 132)",
			borderColor: "rgb(255, 99, 132)",
			label: "Received Value",
			borderWidth: 3,
			data: [],
		}]
	},
	options: {
		devicePixelRatio: 5,
		plugins: {
			legend: {
				display: false
			},
		},
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				grid: {
					color: "rgba(255, 255, 255, 0.3)"
				},
				ticks: {
					color: "#FFFFFF",
				},
				beginAtZero: true,
				title: {
					color: "#FFFFFF",
					display: true,
					text: "Received Value",
					font: {
						size: 16,
					},
				},
			},
			x: {
				type: 'time',
				time: {
					unit: 'second'
				},
				grid: {
					color: "rgba(255, 255, 255, 0.3)"
				},
				ticks: {
					color: "#FFFFFF",
					maxTicksLimit: 6,
				},
				title: {
					color: "#FFFFFF",
					display: true,
					text: "Time (s)",
					font: {
						size: 16,
					},
				},
			}
		}
	}
});

function addData(chart, label, newData) {
	chart.data.labels.push(label);
	chart.data.datasets.forEach((dataset) => {
		dataset.data.push(newData);
	});
	chart.update();
}

setInterval(() => {
	addData(main_chart, Date.now(), Math.random() * 10);
}, 2000);