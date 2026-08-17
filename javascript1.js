document.addEventListener("DOMContentLoaded", function() {
    // 1. Fetch data from localStorage
    const studentName = localStorage.getItem("studentName") || "Unknown Student";
    const age = Number(localStorage.getItem("age")) || 18;
    const gender = localStorage.getItem("gender") || "male";
    const attendance = Number(localStorage.getItem("attendance")) || 0;
    const studyHours = Number(localStorage.getItem("studyHours")) || 0;
    const previousMarks = Number(localStorage.getItem("previousMarks")) || 0;
    const scoreVal = Number(localStorage.getItem("score")) || 0;

    // 2. Populate Profile Information
    const profileAvatar = document.getElementById("profileAvatar");
    if (profileAvatar) {
        profileAvatar.textContent = studentName.charAt(0).toUpperCase();
    }
    
    const nameDisplay = document.getElementById("studentNameDisplay");
    if (nameDisplay) {
        nameDisplay.textContent = studentName;
    }
    
    const genderDisplay = document.getElementById("genderTag");
    if (genderDisplay) {
        genderDisplay.textContent = gender.charAt(0).toUpperCase() + gender.slice(1);
    }
    
    const ageDisplay = document.getElementById("ageDisplay");
    if (ageDisplay) {
        ageDisplay.textContent = age;
    }

    const calculatedScoreDisplay = document.getElementById("calculatedScoreDisplay");
    if (calculatedScoreDisplay) {
        calculatedScoreDisplay.textContent = scoreVal.toFixed(1) + "%";
    }

    // 3. Populate Prediction Score & Circular Gauge
    const scoreText = document.getElementById("scoreText");
    if (scoreText) {
        scoreText.textContent = scoreVal.toFixed(1) + "%";
    }
    
    const scoreGauge = document.getElementById("scoreGauge");
    if (scoreGauge) {
        // Circumference of r=70 circle is 439.8 (440 in CSS)
        const circumference = 440;
        const offset = circumference - (circumference * scoreVal) / 100;
        scoreGauge.style.strokeDashoffset = offset;
    }

    // Update Prediction Badge status text and colors
    const predictionStatus = document.getElementById("predictionStatus");
    if (predictionStatus) {
        if (scoreVal >= 80) {
            predictionStatus.textContent = "Excellent Outlook";
            predictionStatus.className = "prediction-badge status-excellent";
            if (scoreGauge) scoreGauge.style.stroke = "#10b981"; // Success Green
        } else if (scoreVal >= 60) {
            predictionStatus.textContent = "Good Outlook";
            predictionStatus.className = "prediction-badge status-good";
            if (scoreGauge) scoreGauge.style.stroke = "#f59e0b"; // Warning Orange
        } else {
            predictionStatus.textContent = "Improvement Needed";
            predictionStatus.className = "prediction-badge status-average";
            if (scoreGauge) scoreGauge.style.stroke = "#ef4444"; // Danger Red
        }
    }

    // 4. Update KPI Metrics bars and text
    const attVal = document.getElementById("attendanceValue");
    if (attVal) attVal.textContent = attendance + "%";
    const attBar = document.getElementById("attendanceBar");
    if (attBar) attBar.style.width = attendance + "%";

    const hoursVal = document.getElementById("studyHoursValue");
    if (hoursVal) hoursVal.textContent = studyHours + " hrs/wk";
    const hoursBar = document.getElementById("studyHoursBar");
    // Normalize weekly hours: assume 30 hrs/week max cap for visual progress bar representation
    const studyPercentage = Math.min(100, (studyHours / 30) * 100);
    if (hoursBar) hoursBar.style.width = studyPercentage + "%";

    const prevVal = document.getElementById("previousMarksValue");
    if (prevVal) prevVal.textContent = previousMarks + "%";
    const prevBar = document.getElementById("previousMarksBar");
    if (prevBar) prevBar.style.width = previousMarks + "%";

    // 5. Generate Academic Insights / Recommendations
    const insightsList = document.getElementById("insightsList");
    if (insightsList) {
        insightsList.innerHTML = ""; // Clear placeholders

        const recommendations = [];

        // Overall Score evaluation
        if (scoreVal >= 80) {
            recommendations.push({
                type: "positive",
                icon: "🏆",
                title: "Path to Excellence",
                text: `${studentName} is on track for outstanding results. Keep maintaining the current balance of effort and attendance.`
            });
        } else if (scoreVal >= 60) {
            recommendations.push({
                type: "neutral",
                icon: "📈",
                title: "High Potential to Excel",
                text: `${studentName} has solid capability. Slight increases in weekly study time or classroom attendance could easily push them into the Excellent bracket.`
            });
        } else {
            recommendations.push({
                type: "negative",
                icon: "⚠️",
                title: "Academic Risk Alert",
                text: "The overall prediction suggests a high likelihood of average performance. An intervention is recommended to structure study habits."
            });
        }

        // Attendance evaluation
        if (attendance >= 90) {
            recommendations.push({
                type: "positive",
                icon: "✅",
                title: "Superb Attendance Rate",
                text: `Excellent presence at ${attendance}%. Attending lectures regularly guarantees exposure to explanations and peer discussions.`
            });
        } else if (attendance >= 75) {
            recommendations.push({
                type: "neutral",
                icon: "ℹ️",
                title: "Satisfactory Attendance",
                text: `Current attendance is ${attendance}%. Try minimizing absences to secure better classroom participation and visual tracking of core syllabi.`
            });
        } else {
            recommendations.push({
                type: "negative",
                icon: "❗",
                title: "Critical Attendance Warning",
                text: `Attendance is very low at ${attendance}%. Missing key conceptual classes is a major factor in lowered final grades.`
            });
        }

        // Study Hours evaluation
        if (studyHours >= 15) {
            recommendations.push({
                type: "positive",
                icon: "⭐",
                title: "Dedicated Study Habits",
                text: `Weekly study of ${studyHours} hours shows wonderful commitment. Continuing this revision pace will reduce pressure during final exam weeks.`
            });
        } else if (studyHours >= 8) {
            recommendations.push({
                type: "neutral",
                icon: "⏱️",
                title: "Moderate Study Commitment",
                text: `Studying ${studyHours} hours a week is a fair start. Adding an extra 30-45 minutes daily to review weak topics would build stronger memory retention.`
            });
        } else {
            recommendations.push({
                type: "negative",
                icon: "📚",
                title: "Insufficient Study Time",
                text: `${studyHours} hours/week is below the recommended thresholds. Establishing a structured 2-hour daily study routine is vital.`
            });
        }

        // Previous marks evaluation
        if (previousMarks >= 80) {
            recommendations.push({
                type: "positive",
                icon: "🎯",
                title: "Strong Prior Foundation",
                text: `Previous marks of ${previousMarks}% highlight strong academic aptitude. Challenge yourself with advanced exercises to prevent boredom.`
            });
        } else if (previousMarks >= 60) {
            recommendations.push({
                type: "neutral",
                icon: "🧩",
                title: "Capable Foundation",
                text: `Prior result was ${previousMarks}%. Revisit specific topics from recent term tests where marks were lost to solidify understanding.`
            });
        } else {
            recommendations.push({
                type: "negative",
                icon: "🔍",
                title: "Foundational Re-evaluation",
                text: `A previous score of ${previousMarks}% indicates weak foundation points. Seek teacher assistance or tutorial support early on.`
            });
        }

        // Append to list
        recommendations.forEach(rec => {
            const li = document.createElement("li");
            li.className = `insight-item ${rec.type}`;
            
            li.innerHTML = `
                <span class="insight-icon">${rec.icon}</span>
                <div class="insight-content">
                    <span class="insight-title">${rec.title}</span>
                    <span class="insight-text">${rec.text}</span>
                </div>
            `;
            insightsList.appendChild(li);
        });
    }

    // 6. Draw Comparison Chart with Chart.js
    const ctx = document.getElementById("comparisonChart");
    if (ctx) {
        // Standard recommended targets
        const targetAttendance = 85; 
        const targetStudyHoursPct = (15 / 20) * 100; // Target is 15 hrs, normalized where 20 hrs = 100%
        const targetPreviousMarks = 75;

        // Student values normalized for radar mapping (0 to 100)
        const studentAttendance = attendance;
        const studentStudyHoursPct = Math.min(100, (studyHours / 20) * 100);
        const studentPreviousMarks = previousMarks;

        new Chart(ctx, {
            type: "radar",
            data: {
                labels: ["Class Attendance", "Weekly Study Effort", "Previous Marks"],
                datasets: [
                    {
                        label: "Student Profile",
                        data: [studentAttendance, studentStudyHoursPct, studentPreviousMarks],
                        fill: true,
                        backgroundColor: "rgba(99, 102, 241, 0.2)",
                        borderColor: "rgba(99, 102, 241, 1)",
                        pointBackgroundColor: "rgba(99, 102, 241, 1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(99, 102, 241, 1)"
                    },
                    {
                        label: "Recommended Benchmark",
                        data: [targetAttendance, targetStudyHoursPct, targetPreviousMarks],
                        fill: true,
                        backgroundColor: "rgba(168, 85, 247, 0.1)",
                        borderColor: "rgba(168, 85, 247, 0.7)",
                        pointBackgroundColor: "rgba(168, 85, 247, 0.7)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(168, 85, 247, 0.7)",
                        borderDash: [5, 5] // Dashed line for benchmark
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: "rgba(0, 0, 0, 0.05)"
                        },
                        grid: {
                            color: "rgba(0, 0, 0, 0.05)"
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            font: {
                                size: 10
                            }
                        },
                        pointLabels: {
                            font: {
                                family: "Outfit",
                                size: 11,
                                weight: "600"
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            font: {
                                family: "Outfit",
                                size: 11,
                                weight: "500"
                            },
                            boxWidth: 12
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.dataIndex === 1) {
                                    // Study hours detail
                                    const rawVal = context.raw;
                                    const actualHours = ((rawVal / 100) * 20).toFixed(1);
                                    label += actualHours + " hrs/wk";
                                } else {
                                    label += Math.round(context.raw) + "%";
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
});