const ctx = document.getElementById('test');

new Chart(ctx, {
	type: 'line',
	borderColor: "#FFFFFF",

	data: {
		labels: [1, 2, 3, 4, 5, 6],
		datasets: [{
			backgroundColor: "rgb(255, 99, 132)",
			borderColor: "rgb(255, 99, 132)",
			label: '# of Votes',
			borderWidth: 3,
			data: [12, 19, 3, 5, 2, 3],
		}]
	},
	options: {
		devicePixelRatio: 2,
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
						color: "red",
						size: 16,
					},
				},
			},
			x: {
				grid: {
					color: "rgba(255, 255, 255, 0.3)"
				},
				ticks: {
					color: "#FFFFFF",
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