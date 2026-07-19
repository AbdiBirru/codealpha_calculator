class CalculatorEngine {
  constructor() {
    this.reset();
  }

  reset() {
    this.currentValue = '0';
    this.previousValue = null;
    this.operator = null;
    this.overwrite = true;
  }

  inputDigit(digit) {
    const rawLength = this.currentValue.replace('-', '').replace('.', '').length;
    if (!this.overwrite && rawLength >= 15) return;

    if (this.overwrite) {
      this.currentValue = digit === '.' ? '0.' : digit;
      this.overwrite = false;
      return;
    }
    if (digit === '.' && this.currentValue.includes('.')) return;

    this.currentValue = this.currentValue === '0' && digit !== '.'
      ? digit
      : this.currentValue + digit;
  }

  deleteLast() {
    if (this.overwrite) return;
    this.currentValue = this.currentValue.slice(0, -1);
    if (this.currentValue === '' || this.currentValue === '-') {
      this.currentValue = '0';
      this.overwrite = true;
    }
  }

  toggleSign() {
    if (this.currentValue === '0') return;
    this.currentValue = this.currentValue.startsWith('-')
      ? this.currentValue.slice(1)
      : '-' + this.currentValue;
  }

  percent() {
    this.currentValue = String(parseFloat(this.currentValue) / 100);
    this.overwrite = true;
  }

  chooseOperator(op) {
    if (this.operator && !this.overwrite) {
      this.compute();
    }
    this.previousValue = parseFloat(this.currentValue);
    this.operator = op;
    this.overwrite = true;
  }

  compute() {
    if (this.operator === null || this.previousValue === null) return;

    const prev = this.previousValue;
    const curr = parseFloat(this.currentValue);
    let result;

    switch (this.operator) {
      case '+': result = prev + curr; break;
      case '−': result = prev - curr; break;
      case '×': result = prev * curr; break;
      case '÷':
        if (curr === 0) {
          this.currentValue = 'Error';
          this.previousValue = null;
          this.operator = null;
          this.overwrite = true;
          return;
        }
        result = prev / curr;
        break;
      default:
        return;
    }

    result = Math.round((result + Number.EPSILON) * 1e10) / 1e10;

    this.currentValue = String(result);
    this.previousValue = null;
    this.operator = null;
    this.overwrite = true;
  }

  getDisplayValue() {
    if (this.currentValue === 'Error') return 'Error';

    const isNegative = this.currentValue.startsWith('-');
    const raw = this.currentValue.replace('-', '');
    const [intPart, decPart] = raw.split('.');

    if (raw.length > 15) {
      return Number(this.currentValue).toExponential(4);
    }

    const formattedInt = new Intl.NumberFormat('en-US').format(intPart || '0');
    const result = decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
    return (isNegative ? '-' : '') + result;
  }

  getHistoryLabel() {
    if (this.previousValue === null || this.operator === null) return '';
    return `${new Intl.NumberFormat('en-US').format(this.previousValue)} ${this.operator}`;
  }
}

class CalculatorUI {
  constructor(engine) {
    this.engine = engine;
    this.historyEl = document.getElementById('display-history');
    this.currentEl = document.getElementById('display-current');
    this.keypadEl = document.querySelector('.keypad');
    this.operatorKeys = document.querySelectorAll('.key--operator');

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.keypadEl.addEventListener('click', (e) => {
      const key = e.target.closest('.key');
      if (!key) return;
      this.handleAction(key.dataset.action, key.dataset.value);
    });

    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  handleAction(action, value) {
    switch (action) {
      case 'number': this.engine.inputDigit(value); break;
      case 'decimal': this.engine.inputDigit('.'); break;
      case 'operator': this.engine.chooseOperator(value); break;
      case 'equals': this.engine.compute(); break;
      case 'clear': this.engine.reset(); break;
      case 'toggle-sign': this.engine.toggleSign(); break;
      case 'percent': this.engine.percent(); break;
      default: return;
    }
    this.render();
    if (action === 'equals') this.flashResult();
  }

  handleKeydown(e) {
    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      this.handleAction('number', e.key);
      return;
    }

    const keyMap = {
      '+': () => this.handleAction('operator', '+'),
      '-': () => this.handleAction('operator', '−'),
      '*': () => this.handleAction('operator', '×'),
      '/': () => this.handleAction('operator', '÷'),
      'Enter': () => this.handleAction('equals'),
      '=': () => this.handleAction('equals'),
      'Escape': () => this.handleAction('clear'),
      'Backspace': () => { this.engine.deleteLast(); this.render(); },
      '.': () => this.handleAction('decimal'),
      '%': () => this.handleAction('percent'),
    };

    if (keyMap[e.key]) {
      e.preventDefault();
      keyMap[e.key]();
    }
  }

  flashResult() {
    this.currentEl.classList.remove('is-result');
    void this.currentEl.offsetWidth; // forces reflow so the animation can replay
    this.currentEl.classList.add('is-result');
  }

  render() {
    this.currentEl.textContent = this.engine.getDisplayValue();
    this.historyEl.textContent = this.engine.getHistoryLabel();

    this.operatorKeys.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.value === this.engine.operator);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new CalculatorEngine();
  new CalculatorUI(engine);
});
