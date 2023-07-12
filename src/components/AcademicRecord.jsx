import React, { useState, useEffect } from "react";

const AcademicRecord = ({ userInfo, setUserInfo }) => {
  const [numPages, setNumPages] = useState(null);
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const buffer = e.target.result;
      const pdf = await window.pdfjsLib.getDocument(buffer).promise;
      const totalPages = pdf.numPages;
      let extractedText = "";

      setIsProcessing(true);

      const processPageText = async (pageIndex) => {
        const page = await pdf.getPage(pageIndex + 1);
        const pageText = await page.getTextContent();
        const pageStrings = pageText.items.map((item) => item.str);
        extractedText += pageStrings.join(" ");

        if (pageIndex + 1 < totalPages) {
          await processPageText(pageIndex + 1);
        } else {
          setText(extractedText);
          console.log(extractSubjects(extractedText));
          setIsProcessing(false);
        }
      };

      await processPageText(0);
      setNumPages(totalPages);
      setCurrentPage(1);
    };

    reader.readAsArrayBuffer(file);
  };

  const deleteTextSpaces = (text) => {
    const spaces = text.split(/\s+/);

    if (spaces.length >= 3) {
      return spaces.slice(0, -2).join(" ");
    }

    return text;
  };

  const isLastCharNumber = (text) => {
    const lastCharacter = text.charAt(text.length - 1);
    return !isNaN(lastCharacter);
  };

  const validateSubjectAndGrade = (grade, subject) => {
    return (
      grade > 0 && grade <= 20 && subject !== "OD/bwskotrn" && subject !== ""
    );
  };

  const extractStudentInfo = (text) => {
    const cedulaRegex = /Histórico Académico.*?(\d{8})/;
    const nombreStartIndex = text.indexOf("Nombre:") + "Nombre:".length;
    const informacionIndex = text.indexOf("Información");

    const cedulaMatch = text.match(cedulaRegex);
    const cedula = cedulaMatch ? cedulaMatch[1] : "";
    const nombreCompleto = text
      .substring(nombreStartIndex, informacionIndex)
      .trim();

    return { cedula, nombreCompleto };
  };

  const extractSubjects = (text) => {
    const subjects = [];
    const items = text.split("PR");
    let totalUC = 0; // Contador de unidades de crédito
    console.log(text);

    for (let i = 1; i < items.length; i++) {
      const item = items[i].trim();
      const endIndex = item.indexOf(".");
      const subject = item.substring(0, endIndex).trim();

      let grade = "";
      const gradeIndex = item.search(/\d{2}\s/);
      if (gradeIndex !== -1) {
        grade = item.substring(gradeIndex, gradeIndex + 2).trim();
      }

      let subjectName = isLastCharNumber(subject)
        ? deleteTextSpaces(subject)
        : subject;

      if (validateSubjectAndGrade(grade, subjectName)) {
        const ucRegex = /(\d+\.\d{3})/; // Expresión regular para buscar las unidades de crédito
        const ucMatch = item.match(ucRegex);
        const uc = ucMatch ? parseFloat(ucMatch[0]) : 0;
        totalUC += uc; // Sumar las unidades de crédito al contador

        subjects.push({
          Subject:
            subjectName !== "Ecol"
              ? subjectName
              : "Ecologia, ambiente y sustentabilidad",
          Grade: parseInt(grade),
        });
      }
    }

    console.log("Total UC:", totalUC); // Imprimir el total de unidades de crédito
    const studentInfo = extractStudentInfo(text);
    console.log("Cédula:", studentInfo.cedula);
    console.log("Nombre:", studentInfo.nombreCompleto);
    setUserInfo({
      ...userInfo,
      name: studentInfo.nombreCompleto,
      cedula: studentInfo.cedula,
    });

    return subjects;
  };

  return (
    <div>
      <form>
        <input type="file" onChange={handleFileChange} />
      </form>
      <div>
        {isProcessing ? (
          <p>Processing the PDF...</p>
        ) : (
          <>
            <h2>Extracted Text from PDF:</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default AcademicRecord;
