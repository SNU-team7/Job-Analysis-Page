document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('marketChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['백엔드', '프론트엔드', '데이터 사이언스', 'AI'],
            datasets: [{
                label: '시장 규모 (조 원)',
                data: [30, 35, 25, 40],
                backgroundColor: ['#4a90e2', '#50b848', '#f5a623', '#d0021b']
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });
});
