import {
  Button,
  Fade,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Clear, ReportProblemOutlined } from "@mui/icons-material";

const AcademicRecord = ({
  userInfo,
  setUserInfo,
  setAcademicRecord,
  selectedFile,
  setSelectedFile,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setErrorMessage("");

      const reader = new FileReader();

      reader.onload = async (e) => {
        const buffer = e.target.result;
        const pdf = await window.pdfjsLib.getDocument(buffer).promise;
        const totalPages = pdf.numPages;
        let extractedText = "";

        const processPageText = async (pageIndex) => {
          const page = await pdf.getPage(pageIndex + 1);
          const pageText = await page.getTextContent();
          const pageStrings = pageText.items.map((item) => item.str);
          extractedText += pageStrings.join(" ");

          if (pageIndex + 1 < totalPages) {
            await processPageText(pageIndex + 1);
          } else {
            setAcademicRecord(extractSubjects(extractedText));
          }
        };

        await processPageText(0);
      };

      reader.readAsArrayBuffer(file);

      setIsUploaded(true);
    } else {
      setErrorMessage("Por favor, selecciona un archivo PDF válido");
    }
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

    if (!text.includes("Ingeniería Informática")) {
      setErrorMessage("No eres estudiante de Ingeniería en informática");
    }

    if (totalUC < 197)
      setErrorMessage(
        "Según tu histórico académico, aún no puedes ver electivas"
      );

    if (!text.includes("Histórico Académico")) {
      setErrorMessage("Hubo un error leyendo el histórico académico");
    }

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

  const handleDeleteFile = () => {
    setSelectedFile(null);
    setErrorMessage("");
    setIsUploaded(false);
    setAcademicRecord([]);
  };

  return (
    <div>
      {selectedFile ? (
        <div
          style={{
            width: "100%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginRight: "5pt",
            }}
          >
            <Typography variant="inherit">{selectedFile.name}</Typography>
          </div>
          <Tooltip title="Eliminar Archivo">
            <IconButton onClick={handleDeleteFile}>
              <Clear />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <label htmlFor={"inputAcademicRecord"}>
          <input
            style={{ display: "none" }}
            accept="application/pdf"
            id={"inputAcademicRecord"}
            type="file"
            onChange={handleFileChange}
          />
          <Button
            variant="outlined"
            startIcon={<UploadFileOutlinedIcon />}
            component="span"
            fullWidth
          >
            Cargar histórico académico
          </Button>
        </label>
      )}
      <div>
        {errorMessage && (
          <Fade in timeout={2000}>
            <div>
              <>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  justifyContent={"center"}
                >
                  <ReportProblemOutlined color="error" fontSize="small" />
                  <Typography variant="body2" color={"error"}>
                    {errorMessage}
                  </Typography>
                </Stack>
              </>
            </div>
          </Fade>
        )}
      </div>
    </div>
  );
};

export default AcademicRecord;
