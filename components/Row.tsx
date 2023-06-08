import Image from "next/image";
import React, { memo } from "react";

type Props = { student: { id: number; name: string } };

const VALUATION_ASPECT_OPTIONS = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
  { label: 6, value: 6 },
  { label: 7, value: 7 },
  { label: 8, value: 8 },
  { label: 9, value: 9 },
  { label: 10, value: 10 },
];

const Row = ({ student }: Props) => {
  return (
    <tr className="border-b">
      <td className="p-2 text-left flex items-center">
        <Image src="/profile-ic.svg" width={24} height={24} alt="profile-ic" />
        <p className="ml-4"> Mahasiswa {student.id}</p>
      </td>
      <td className="p-2 text-left">
        <select
          name={`aspek_penilaian_1[${student.id}]`}
          className="w-full border"
        >
          {VALUATION_ASPECT_OPTIONS.map((option, optionKey) => (
            <option key={optionKey} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 text-left">
        <select
          name={`aspek_penilaian_2[${student.id}]`}
          className="w-full border"
        >
          {VALUATION_ASPECT_OPTIONS.map((option, optionKey) => (
            <option key={optionKey} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 text-left">
        <select
          name={`aspek_penilaian_3[${student.id}]`}
          className="w-full border"
        >
          {VALUATION_ASPECT_OPTIONS.map((option, optionKey) => (
            <option key={optionKey} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 text-left">
        <select
          name={`aspek_penilaian_4[${student.id}]`}
          className="w-full border"
        >
          {VALUATION_ASPECT_OPTIONS.map((option, optionKey) => (
            <option key={optionKey} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
};

const MemoizedRow = memo(Row);

export default MemoizedRow;
