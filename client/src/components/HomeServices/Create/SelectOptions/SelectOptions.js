const SelectOptions = ({
    value,
    children
}) => {
    return (
        <option value={value}>{children}</option>
    );
};

export default SelectOptions;
