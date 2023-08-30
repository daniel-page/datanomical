const ctx = document.getElementById("main_graph");

main_chart = new Chart(ctx, {
	type: "line",
	borderColor: "#FFFFFF",
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
					text: "Data",
					font: {
						size: 16,
					},
				},
			},
			x: {
				type: 'timeseries',
				// time: {
				// 	unit: 'second'
				// },
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

function addData(chart, name, time, newData) {

	const index = chart.data.datasets.findIndex((dataset) => dataset.label === name);
	console.log(index);

	if (index >= 0) {
		chart.data.datasets[index].data.push({ x: time, y: newData });
		console.log("Data added!");
	} else {
		console.log("Not found. New dataset created.");
		var newDataset = {
			backgroundColor: "rgb(255, 99, 132)",
			borderColor: "rgb(255, 99, 132)",
			label: name,
			borderWidth: 1,
			data: [{ x: time, y: newData }],
		}
		chart.data.datasets.push(newDataset);
	}

	chart.update();
}

setInterval(() => {
	fetch('http://localhost:3000/data_collect')
		.then(response => response.json())
		.then(data => {
			// Handle data
			console.log("Data received int: " + JSON.stringify(data));
			addData(main_chart, data["name"], data["time"], data["data"]);
		})
		.catch(error => {
			// Handle error
		});
}, 500);