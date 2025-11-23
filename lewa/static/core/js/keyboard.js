document.addEventListener("DOMContentLoaded", () => {
    const layoutElement = document.getElementById('keyboard_layout_data');
    if (!layoutElement) return;
    const layoutData = JSON.parse(layoutElement.textContent);
    const keyboardContainer = document.getElementById('virtual-keyboard');
    const inputField = document.getElementById('user-input');

    const createKey = (text, className, onClick) => {
	const btn = document.createElement('button');
	btn.className = `button key-btn ${className || ''}`;
	btn.innerHTML = text;
	btn.onclick = (e) => {
	    e.preventDefault();
	    onClick();
	    inputField.focus();
	};
	return btn;
    };

    Object.keys(layoutData).sort().forEach(rowKey => {
	const rowDiv =document.createElement("div");
	rowDiv.className = "buttons is-centered mb-2"

	layoutData[rowKey].forEach(char => {
	    const btn = document.createElement('button');
	    btn.className = "button key-btn"
	    btn.textContent = char;
	    btn.onclick = () => {
		inputField.value += char;
		inputField.focus();
	    };
	    rowDiv.appendChild(btn);
	}
				  );
	keyboardContainer.appendChild(rowDiv);

    });

    const funcRow = document.createElement("div");
    funcRow.className = "buttons is-centered mb-2";
    const backspaceBtn = createKey('<i class="fas fa-backspace"></i>', "is-warning", () => {
	inputField.value = inputField.value.slice(0, -1);
    });
    funcRow.appendChild(backspaceBtn);

    const spaceBtn = createKey("Space", "is-light space-key", () => {
	inputField.value += " ";
    });
    funcRow.appendChild(spaceBtn);

    const enterBtn = createKey('<i class="fas fa-level-down-alt fa-rotate-90"></i>', "is-success", () => {
	inputField.value += "\n";
    });
    funcRow.appendChild(enterBtn);

    keyboardContainer.appendChild(funcRow);
});
