import { useEffect, useRef, useState, useMemo } from "react";

const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const toggle = (e) => {
      if (inputRef.current && inputRef.current.contains(e.target)) {
        setIsOpen((prev) => !prev);
      } else {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery("");
    handleChange(option[label]);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      const value = option[label] || ""; // Default to empty string if undefined
      return value.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, options]);

  // Limit the displayed options to 5
  const limitedOptions = filteredOptions.slice(0, 5); // Adjust the number as needed

  return (
    <div className="dropdown">
      <div className="control">
        <input
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          name="searchTerm"
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange(null);
          }}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {limitedOptions.length === 0 ? (
          <div className="no-options">No options found</div>
        ) : (
          limitedOptions.map((option, index) => (
            <div
              onClick={() => selectOption(option)}
              className={`option ${
                option[label] === selectedVal ? "selected" : ""
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;
