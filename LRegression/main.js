document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("regressionChart").getContext("2d");

    // Dữ liệu diện tích (m²) và giá nhà (triệu)
    let dataPoints = [
        { x: 30, y: 700 }, { x: 50, y: 900 }, { x: 70, y: 1300 },
        { x: 90, y: 1600 }, { x: 110, y: 2000 }, { x: 130, y: 2200 },
        { x: 150, y: 2600 }, { x: 40, y: 2000 }, { x: 85, y: 1450 }, 
        { x: 85, y: 2800 }, { x: 95, y: 600 }, { x: 145, y: 1400 },
        { x: 120, y: 1000 }, { x: 100, y: 800 }, { x: 115, y: 2900 },
        { x: 60, y: 2500 }, // Điểm xa đường hồi quy
    ];

    // Hồi quy tuyến tính: y = ax + b
    let a = 15;  // Hệ số hồi quy (độ dốc)
    let b = 300; // Hệ số chặn (giá trị y khi x = 0)

    // Dữ liệu đường hồi quy (giá dự đoán)
    let regressionLine = [];
    for (let x = 20; x <= 160; x += 10) {
        regressionLine.push({ x: x, y: a * x + b });
    }

    // Phân loại điểm: "Lấy" nếu gần đường hồi quy, "Không lấy" nếu xa
    let threshold = 400; // Khoảng cách tối đa để được coi là gần
    let acceptedPoints = [];
    let rejectedPoints = [];

    dataPoints.forEach(point => {
        let predictedY = a * point.x + b;
        let distance = Math.abs(point.y - predictedY);

        if (distance <= threshold) {
            acceptedPoints.push(point);
        } else {
            rejectedPoints.push(point);
        }
    });

    // Vẽ biểu đồ bằng Chart.js
    new Chart(ctx, {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Nhóm Lấy (Hợp lý)",
                    data: acceptedPoints,
                    backgroundColor: "blue",
                    pointRadius: 6,
                },
                {
                    label: "Nhóm Không Lấy (Xa xu hướng)",
                    data: rejectedPoints,
                    backgroundColor: "red",
                    pointRadius: 6,
                },
                {
                    label: "Hồi quy tuyến tính",
                    data: regressionLine,
                    type: "line",
                    borderColor: "green",
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: { display: true, text: "Diện tích (m²)" },
                    min: 20,
                    max: 160
                },
                y: {
                    title: { display: true, text: "Giá nhà (triệu)" }
                }
            }
        }
    });
});
