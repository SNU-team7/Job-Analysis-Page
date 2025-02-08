document.addEventListener('DOMContentLoaded', function () {
    // 전체 기술 스택 목록
    const allSkills = [
        "Python", "Java", "C#", "Node.js", "Go", "Rust", "Ruby", "PHP", "API",
        "Spring", "Spring Boot", "Django", "Flask", "Express.js",
        "SQL", "PostgreSQL", "MySQL", "MariaDB", "SQLite", "OracleDB", "MSSQL",
        "MongoDB", "Redis", "Cassandra", "DynamoDB", "Neo4j",
        "REST API", "GraphQL", "gRPC", "WebSocket",
        "Docker", "Kubernetes", "Nginx", "Apache", "CI/CD", "Jenkins",
        "Kafka", "RabbitMQ", "Celery", "Redis Queue",
        "AWS", "EC2", "S3", "Lambda", "RDS", "GCP", "Azure",
        "OAuth", "JWT", "OpenID", "SAML",
        "HTML", "CSS", "JavaScript", "TypeScript",
        "React", "Vue.js", "Angular", "Svelte",
        "Next.js", "Nuxt.js", "Remix", "Astro",
        "Tailwind CSS", "Bootstrap", "Material UI", "Ant Design",
        "Webpack", "Vite", "Rollup", "Parcel",
        "Redux", "Zustand", "Recoil", "MobX",
        "Three.js", "WebGL", "D3.js",
        "PWA", "Service Worker", "WebAssembly",
        "TensorFlow", "PyTorch", "JAX", "Keras", "Theano",
        "Scikit-learn", "XGBoost", "LightGBM", "CatBoost",
        "OpenCV", "Dlib", "Albumentations",
        "Hugging Face Transformers", "Sentence Transformers", "OpenAI API",
        "CNN", "RNN", "LSTM", "Transformer", "Diffusion Model", "GAN",
        "YOLO", "Detectron2", "MMDetection",
        "RLHF", "Deep Q-Learning",
        "Speech-to-Text", "Whisper", "Wav2Vec", "Text-to-Speech", "Tacotron", "VITS",
        "ONNX", "TensorRT", "OpenVINO",
        "Pandas", "NumPy", "SciPy",
        "Matplotlib", "Seaborn", "Plotly", "Bokeh",
        "SQL", "Spark SQL", "Presto", "Trino",
        "Apache Spark", "Hadoop", "Dask", "Ray",
        "Snowflake", "BigQuery", "Redshift", "ClickHouse",
        "Airflow", "Luigi", "Kedro", "MLflow",
        "FastAPI", "Streamlit", "Dash", "Gradio",
        "Data Cleaning", "Feature Engineering", "Data Wrangling",
        "Data Warehouse", "Data Lake", "ETL", "ELT"
    ];

    // 사용자의 기술 스택 (기본값)
    let userSkills = {
        "Python": 1, "JavaScript": 1, "React": 1, "Node.js": 1,
        "SQL": 1, "TensorFlow": 1, "Pandas": 1, "Docker": 1
    };

    // 시장 요구 기술
    const jobMarketSkills = {
        "Backend": ["Node.js", "SQL", "Docker"],
        "Frontend": ["JavaScript", "React"],
        "Data Science": ["Python", "Pandas"],
        "AI": ["Python", "TensorFlow"]
    };

    // 기술 추가 함수
    function addSkill(skill) {
        if (skill && allSkills.includes(skill) && !userSkills[skill]) {
            userSkills[skill] = 1;
            updateUI();
        }
    }

    // 기술 삭제 함수
    function removeSkill(skill) {
        delete userSkills[skill];
        updateUI();
    }

    // UI 업데이트 (그래프 및 추천 기술 갱신)
    function updateUI() {
        let scores = calculateMatch(userSkills, jobMarketSkills);
        document.getElementById('backend-score').textContent = scores["Backend"];
        document.getElementById('frontend-score').textContent = scores["Frontend"];
        document.getElementById('data-score').textContent = scores["Data Science"];
        document.getElementById('ai-score').textContent = scores["AI"];
        
        radarChart.data.datasets[0].data = [
            scores["Backend"], scores["Frontend"], scores["Data Science"], scores["AI"]
        ];
        radarChart.update();
        
        document.getElementById('recommended-skills').innerHTML = recommendNewSkills(userSkills, jobMarketSkills);
        
        updateSelectedSkillsUI();
    }

    // 선택된 기술 목록 UI 업데이트
    function updateSelectedSkillsUI() {
        const selectedSkillsList = document.getElementById('selected-skills-list');
        selectedSkillsList.innerHTML = '';

        for (const skill in userSkills) {
            const skillButton = document.createElement('button');
            skillButton.textContent = `${skill} ❌`;
            skillButton.classList.add('skill-button');
            skillButton.addEventListener('click', function () {
                removeSkill(skill);
            });
            selectedSkillsList.appendChild(skillButton);
        }
    }

    // 적합도 계산
    function calculateMatch(user, market) {
        let scores = {};
        for (let category in market) {
            let count = market[category].filter(skill => user[skill]).length;
            scores[category] = Math.round((count / market[category].length) * 100);
        }
        return scores;
    }

    // 추천 학습 기술 계산
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

    // 기술 목록 추가 (datalist 활용)
    const skillInput = document.getElementById('skillInput');
    const skillList = document.createElement('datalist');
    skillList.id = 'skills-list';
    allSkills.forEach(skill => {
        let option = document.createElement('option');
        option.value = skill;
        skillList.appendChild(option);
    });
    document.body.appendChild(skillList);

    // 기술 추가 이벤트
    skillInput.addEventListener('change', function () {
        addSkill(this.value);
        this.value = '';
    });

    // 레이더 차트 생성
    let scores = calculateMatch(userSkills, jobMarketSkills);
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

    // 초기 UI 업데이트
    updateUI();
});
