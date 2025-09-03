import { getCountries } from '@/app/_lib/data-service';

// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry, name, id, className }) {
  // Get filtered countries from the data service
  const countries = await getCountries();
  
  // Sort countries alphabetically
  const sortedCountries = [...countries].sort((a, b) => 
    a.name.localeCompare(b.name)
  );
  
  // Find the flag for the default country
  const flag =
    sortedCountries.find((country) => country.name === defaultCountry)?.flag ?? '';

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {sortedCountries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
