const form = document.getElementById('profileForm');
const $ = (id) => document.getElementById(id);
const activityLabels = {
  '1.2': 'mostly sitting', '1.375': 'lightly active',
  '1.55': 'moderately active', '1.725': 'very active', '1.9': 'extremely active'
};

$('todayDate').textContent = new Date().toLocaleDateString(undefined, {
  weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
});

function bmiCategory(bmi) {
  // Adult BMI categories are only a general screening guide.
  if (bmi < 18.5) return ['Below typical adult range', 'badge'];
  if (bmi < 25) return ['Typical adult range', 'badge'];
  if (bmi < 30) return ['Above typical adult range', 'badge'];
  return ['High adult BMI range', 'badge'];
}

function calculateMetrics(data) {
  const heightM = data.height / 100;
  const bmi = data.weight / (heightM * heightM);
  // Mifflin-St Jeor estimate. For "other", average sex-specific constant is used.
  let bmr;
  if (data.gender === 'male') bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
  else if (data.gender === 'female') bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
  else bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 78;
  return { bmi, calories: Math.round(bmr * Number(data.activity)) };
}

function goalAdvice(goal, calories, activity) {
  const tips = {
    'Lose weight': `Your estimated maintenance is about ${calories} kcal/day. If weight loss is appropriate for you, discuss a modest, sustainable calorie deficit with a qualified professional rather than using a crash diet.`,
    'Maintain weight': `Use about ${calories} kcal/day as a rough starting estimate, then adjust based on energy, hunger, activity, and weight trends over several weeks.`,
    'Gain weight': `For gradual weight gain, focus on regular balanced meals and strength training if suitable. Your estimated maintenance is about ${calories} kcal/day; a professional can help set an appropriate surplus.`,
    'Build muscle': `Prioritize progressive resistance training, adequate recovery, and protein-rich foods. Your estimated maintenance is about ${calories} kcal/day; individual needs vary.`,
    'Improve fitness': `Start with achievable activity, recovery, and balanced meals. Your estimated maintenance is about ${calories} kcal/day; use this as a rough estimate, not a strict target.`
  };
  return tips[goal] || 'Set a realistic goal and build consistent habits.';
}

function showProfile(data) {
  const metrics = calculateMetrics(data);
  const category = bmiCategory(metrics.bmi);
  $('weightStat').innerHTML = `${data.weight.toFixed(1)} <small>kg</small>`;
  $('weightHint').textContent = `Profile for ${data.name}`;
  $('calorieStat').innerHTML = `${metrics.calories.toLocaleString()} <small>kcal</small>`;
  $('bmiStat').textContent = metrics.bmi.toFixed(1);
  $('bmiHint').textContent = category[0];
  $('goalStat').textContent = data.goal;
  $('emptyState').classList.add('hidden');
  $('results').classList.remove('hidden');
  $('avatar').textContent = data.name.trim().charAt(0).toUpperCase();
  $('welcomeName').textContent = data.name;
  $('resultBMI').textContent = metrics.bmi.toFixed(1);
  $('bmiBadge').textContent = category[0];
  $('resultCalories').textContent = metrics.calories.toLocaleString();
  $('goalTip').textContent = goalAdvice(data.goal, metrics.calories, data.activity);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = {
    name: $('name').value.trim(),
    age: Number($('age').value),
    gender: $('gender').value,
    height: Number($('height').value),
    weight: Number($('weight').value),
    activity: $('activity').value,
    goal: $('goal').value
  };
  if (!data.name || !data.gender || !data.goal || !data.activity ||
      data.age < 13 || data.age > 100 || data.height < 100 || data.height > 250 ||
      data.weight < 25 || data.weight > 350) {
    $('formMessage').textContent = 'Please check your details and try again.';
    return;
  }
  localStorage.setItem('aifitness-profile', JSON.stringify(data));
  showProfile(data);
  $('formMessage').textContent = 'Your profile has been saved in this browser.';
});

$('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('aifitness-dark', document.body.classList.contains('dark') ? '1' : '0');
});

if (localStorage.getItem('aifitness-dark') === '1') document.body.classList.add('dark');
try {
  const saved = localStorage.getItem('aifitness-profile');
  if (saved) {
    const data = JSON.parse(saved);
    Object.entries(data).forEach(([key, value]) => {
      const field = $(key);
      if (field) field.value = value;
    });
    showProfile(data);
    $('formMessage').textContent = 'Loaded your saved profile from this browser.';
  }
} catch (error) {
  localStorage.removeItem('aifitness-profile');
}
