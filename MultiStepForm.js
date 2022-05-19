class MultiStepForm {
  #formElement;
  #options = {
    fieldsPerStep: 2,
    fieldClassName: "msf_field",
    cardClassNames: ''
  };

  #stepsCount;
  #fields = [];
  #pointer = 1;
  #previousStep;
  #currentStep;
  #nextStep;

  /**
   * Initialize MultiStepForm
   * @param {HTMLFormElement} formElement
   * The target FormElement
   * @param {Object} options
   * Options for multi form behavior
   */
  constructor(formElement, options = {}) {
    this.#formElement = formElement;
    Object.keys(options).forEach((name) => {
      if (this.#options[name]) this.#options[name] = options[name];
      else
        console.error(
          "Undefined prop: Given option is not part of MultiStepForm options"
        );
    });

    this.#initFields()

    this.#stepsCount = Math.round(
      this.#fields.length / this.#options.fieldsPerStep
    );
    this.#initStep();
    window.addEventListener("stepChanged", this.#update.bind(this));
    dispatchEvent(new Event('stepChanged'))
  }

  /**
   * Query all fields from the form
   */
  #initFields() {
    this.#fields = Array.from(
      this.#formElement.querySelectorAll(`.${this.#options.fieldClassName}`)
    );
  }

  /**
   * Upadate when form UI change step and renitialize the class steps props
   */
  #update() {
    this.#initFields()
    this.#pointer++;
    this.#initStep();
    
  }

  /**
   * Initialize the different the class steps props
   */
  #initStep() {
    this.#previousStep =
      this.#pointer > 1
        ? {
            position: this.#pointer - 1,
            content: this.getContent(this.#pointer - 1),
          }
        : undefined;
    this.#currentStep = {
      position: this.#pointer,
      content: this.getContent(this.#pointer),
    };

    this.#nextStep =
      this.#stepsCount > 1 && this.#pointer < this.#stepsCount
        ? {
            position: this.#pointer + 1,
            content: this.getContent(this.#pointer + 1),
          }
        : undefined;
  }

  getContent(pointer) {
    if(pointer <= 1) {
      return this.#fields.slice(0, this.#options.fieldsPerStep)
    }
    return this.#fields.slice(
      (pointer - 1) * this.#options.fieldsPerStep,
      pointer * this.#options.fieldsPerStep
    )
  }
}

export default MultiStepForm;
