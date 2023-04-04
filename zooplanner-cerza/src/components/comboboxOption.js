import React from 'react';

const comboboxOption = (props) => {
    const optionsList = props.options
    const id = props.id
    const name = props.name
    const selectedOption = props.selectedOption
    const setSelectedOption = props.setSelectedOption

    return (
        <div>
            <select className="inputComboBoxForm" type="select" id={id} name={name} value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value="">Sélectionner une fonction</option>
                    {optionsList.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>            
        </div>
    );
};

export default comboboxOption;