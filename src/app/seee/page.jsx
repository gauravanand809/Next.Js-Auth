'use client'
import SearchableDropdown from '../../helpers/searchableDrop';
import { useState } from "react";
import {companyData} from '../../../csvjsona'
import '../../components/search.module.css'
export default function App() {
  const [value, setValue] = useState("Select option...");

  return (
    <div className="App">
      <SearchableDropdown
        options={companyData}
        label="Company"
        selectedVal={value}
        handleChange={(val) => setValue(val)}
      />
    </div>
  );
}
