import React from "react";

class dropdownIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.dropdown = [];
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutsideToClose);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleClickOutsideToClose);
  }

  handleClickOutsideToClose = e => {
    let toClose = true;

    this.dropdown.forEach(dropdown => {
      if (dropdown !== null && dropdown.contains(e.target)) {
        toClose = false;
      }
    });

    if (toClose) {
      this.handleCloseAll();
    }
  };

  handleCloseAll = () => {
    this.dropdown.forEach(dropdown => {
      if (dropdown !== null) {
        dropdown.classList.remove("is-active");
      }
    });
  };

  handleOpenDropdown = indexDropdown => {
    this.dropdown.forEach(dropdown => {
      if (dropdown !== null) {
        if (dropdown === this.dropdown[indexDropdown]) {
          dropdown.classList.toggle("is-active");
        } else {
          dropdown.classList.remove("is-active");
        }
      }
    });
  };

  render() {
    const { i, children } = this.props;

    return (
      <span className="card-header-icon">
        <div
          className="dropdown is-right"
          ref={dropdown => {
            this.dropdown[i] = dropdown;
          }}
          onClick={() => this.handleOpenDropdown(i)}
        >
          <div className="dropdown-trigger">
            <span className="icon is-medium">
              <i
                className="fas fa-ellipsis-v is-medium"
                style={{ color: "gray" }}
                aria-hidden="true"
              />
            </span>
          </div>
          {children}
        </div>
      </span>
    );
  }
}

export default dropdownIcon;
