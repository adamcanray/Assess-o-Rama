"use client";
import Row from "@/components/Row";
import { copyToClipboard } from "@/utils/copyToClipboard";
import Image from "next/image";
import { memo, useState } from "react";

interface IAspects {
  aspek_penilaian_1: { [key: string]: number };
  aspek_penilaian_2: { [key: string]: number };
  aspek_penilaian_3: { [key: string]: number };
  aspek_penilaian_4: { [key: string]: number };
}

const aspectsDefaultValue = {
  aspek_penilaian_1: {},
  aspek_penilaian_2: {},
  aspek_penilaian_3: {},
  aspek_penilaian_4: {},
};

const PlusSmIc = () => (
  <Image src="/plus-sm-ic.svg" width={24} height={24} alt="plus-sm-ic" />
);

const MemoizedPlusSmIc = memo(PlusSmIc);

export default function Home() {
  const [aspects, setAspects] = useState<IAspects>(aspectsDefaultValue);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [students, setStudents] = useState<Array<{ id: number; name: string }>>(
    [{ id: 1, name: "1" }]
  );

  const onSave = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let aspectsResult = { ...aspects };

    students.forEach((student, studentKey) => {
      aspectsResult = {
        aspek_penilaian_1: {
          ...aspectsResult.aspek_penilaian_1,
          [`mahasiswa_${student.id}`]: parseInt(
            (e.target as any)[`aspek_penilaian_1[${student.id}]`].value
          ),
        },
        aspek_penilaian_2: {
          ...aspectsResult.aspek_penilaian_2,
          [`mahasiswa_${student.id}`]: parseInt(
            (e.target as any)[`aspek_penilaian_2[${student.id}]`].value
          ),
        },
        aspek_penilaian_3: {
          ...aspectsResult.aspek_penilaian_3,
          [`mahasiswa_${student.id}`]: parseInt(
            (e.target as any)[`aspek_penilaian_3[${student.id}]`].value
          ),
        },
        aspek_penilaian_4: {
          ...aspectsResult.aspek_penilaian_4,
          [`mahasiswa_${student.id}`]: parseInt(
            (e.target as any)[`aspek_penilaian_4[${student.id}]`].value
          ),
        },
      };
    });

    setAspects(aspectsResult as any);

    setShowResultModal(true);
  };

  const addStudent = () => {
    const newStudentId: number = students[students.length - 1].id + 1;
    setStudents([
      ...students,
      { id: newStudentId, name: newStudentId.toString() },
    ]);
  };

  return (
    <main className="px-10 py-6 relative min-h-screen text-neutral-800">
      <h1 className="text-2xl text-center">Aplikasi Penilaian Mahasiswa</h1>
      <div className="mt-10">
        <form onSubmit={onSave}>
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 text-left"></th>
                <th className="p-2 text-left">Aspek Penilaian 1</th>
                <th className="p-2 text-left">Aspek Penilaian 2</th>
                <th className="p-2 text-left">Aspek Penilaian 3</th>
                <th className="p-2 text-left">Aspek Penilaian 4</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, studentKey) => (
                <Row key={studentKey} student={student} />
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="p-2 bg-green-500"
              onClick={addStudent}
            >
              <MemoizedPlusSmIc />
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
              Simpan
            </button>
          </div>
        </form>
      </div>
      {showResultModal && (
        <div className="absolute z-10 top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white shadow-lg">
            <div className="text-right">
              <button
                className="px-3 py-1.5 text-neutral-800 text-2xl leading-none"
                onClick={() => {
                  setShowResultModal(false);
                }}
              >
                &times;
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="w-96 h-[300px] overflow-auto">
                <div className="bg-gray-50 text-neutral-800 whitespace-pre p-4">
                  {JSON.stringify(aspects, null, 2)}
                </div>
              </div>
              <button
                className="mt-4 px-4 py-1 bg-pink-500 text-white"
                onClick={() => {
                  copyToClipboard(JSON.stringify(aspects, null, 2)).then(() => {
                    alert("Copied!");
                  });
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
