document.addEventListener('DOMContentLoaded', function () {
    const userSkills = {
        "Python": 1, "JavaScript": 1, "React": 1, "Node.js": 1, 
        "SQL": 1, "TensorFlow": 1, "Pandas": 1, "Docker": 1
    };

    const jobMarketSkills = {
        "Backend": ["Node.js", "SQL", "Docker"],
        "Frontend": ["JavaScript", "React"],
        "Data Science": ["Python", "Pandas"],
        "AI": ["Python", "TensorFlow"]
    };

    function calculateMatch(user, market) {
        let scores = {};
        for (let category in market) {
            let count = market[category].filter(skill => user[skill]).length;
            scores[category] = Math.round((count / market[category].length) * 100);
        }
        return scores;
    }

    let scores = calculateMatch(userSkills, jobMarketSkills);
    
    document.getElementById('backend-score').textContent = scores["Backend"];
    document.getElementById('frontend-score').textContent = scores["Frontend"];
    document.getElementById('data-score').textContent = scores["Data Science"];
    document.getElementById('ai-score').textContent = scores["AI"];

    let radarChart = new Chart(document.getElementById('radarChart'), {
        type: 'radar',
        data: {
            labels: ["Backend", "Frontend", "Data Science", "AI"],
            datasets: [{
                label: "적합도 (%)",
                data: [scores["Backend"], scores["Frontend"], scores["Data Science"], scores["AI"]],
                backgroundColor: "rgba(74, 144, 226, 0.4)",
                borderColor: "#4a90e2",
                borderWidth: 2
            }]
        },
        options: {
            scales: { r: { beginAtZero: true, max: 100 } }
        }
    });

    function recommendNewSkills(user, market) {
        let recommendations = [];
        for (let category in market) {
            let missing = market[category].filter(skill => !user[skill]);
            if (missing.length > 0) {
                recommendations.push(`${category}: ${missing.join(", ")}`);
            }
        }
        return recommendations.join("<br>");
    }

    document.getElementById('recommended-skills').innerHTML = recommendNewSkills(userSkills, jobMarketSkills);
});
