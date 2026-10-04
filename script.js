document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    fetchQuote();
});

// 날씨 정보 가져오기 (Open-Meteo API)
async function fetchWeather() {
    const locations = {
        seoul: { lat: 37.5665, lon: 126.9780, id: 'weather-seoul' },
        jeju: { lat: 33.4996, lon: 126.5312, id: 'weather-jeju' }
    };

    for (const [key, loc] of Object.entries(locations)) {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true`);
            const data = await response.json();
            
            if (data.current_weather) {
                const temp = data.current_weather.temperature;
                const widget = document.getElementById(loc.id);
                widget.querySelector('.temp').textContent = `${temp}°C`;
            }
        } catch (error) {
            console.error(`날씨 정보를 가져오는 데 실패했습니다 (${key}):`, error);
            const widget = document.getElementById(loc.id);
            widget.querySelector('.temp').textContent = '에러';
        }
    }
}

// 명언 가져오기
function fetchQuote() {
    // 한국어 명언 배열
    const quotes = [
        { text: "삶이 있는 한 희망은 있다", author: "키케로" },
        { text: "산다는것 그것은 치열한 전투이다", author: "로망로랑" },
        { text: "하루에 3시간을 걸으면 7년 후에 지구를 한 바퀴 돌 수 있다", author: "새뮤얼 존슨" },
        { text: "언제나 현재에 집중할수 있다면 행복할것이다", author: "파울로 코엘료" },
        { text: "진정으로 웃으려면 고통을 참아야하며, 나아가 고통을 즐길 줄 알아야 해", author: "찰리 채플린" },
        { text: "피할수 없으면 즐겨라", author: "로버트 엘리엇" },
        { text: "단순하게 살아라. 현대인은 쓸데없는 절차와 일 때문에 얼마나 복잡한 삶을 살아가는가?", author: "이드리스 샤흐" },
        { text: "먼저 자신을 용서하라. 그래야 타인을 용서할 수 있다", author: "유리 시도로프" }
    ];
    
    // 랜덤으로 하나 선택
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // 화면에 표시
    document.getElementById('quote-text').textContent = `"${randomQuote.text}"`;
    document.getElementById('quote-author').textContent = `- ${randomQuote.author} -`;
}
