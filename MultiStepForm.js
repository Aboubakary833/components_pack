class MultiStepForm {
  #formElement;
  #options = {
    fieldPerStep: 2,
    fieldClassName: "msf_field",
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

    this.#fields = Array.from(
      this.#formElement.querySelectorAll(`.${this.#options.fieldClassName}`)
    );

    this.#stepsCount = Math.round(
      this.#fields.length / this.#options.fieldPerStep
    );
    this.#initStep();

    window.addEventListener("stepChanged", this.#update);
  }

  /**
   * Upadate when form UI change step and renitialize the class steps props
   */
  #update() {
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
            postion: this.#pointer - 1,
            content: null,
          }
        : undefined;

    this.#currentStep = {
      postion: this.#pointer,
      content: null,
    };

    this.#nextStep =
      this.#stepsCount > 1 && this.#pointer < this.#stepsCount
        ? {
            postion: this.#pointer + 1,
            content: null,
          }
        : undefined;
  }
}

export default MultiStepForm;
