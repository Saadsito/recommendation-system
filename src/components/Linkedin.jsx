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
import { Clear, LinkedIn, ReportProblemOutlined } from "@mui/icons-material";

const Linkedin = ({
  valueExpertiseAreas,
  setValueExpertiseAreas,
  valueTechnologies,
  setValueTechnologies,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

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

          // Agregar un espacio después de cada cadena
          extractedText += pageStrings.join(" ");

          if (pageIndex + 1 < totalPages) {
            await processPageText(pageIndex + 1);
          } else {
            // Reemplazar espacios consecutivos por un salto de línea
            extractedText = extractedText.replace(/\s{2,}/g, "\n");
            console.log(extractedText);
          }
        };

        await processPageText(0);

        const mainAptitudes = extractTechnologies(extractedText);

        // Filtrar aptitudes que no existen en valueTechnologies y luego concatenar
        const newAptitudes = mainAptitudes.filter(
          (aptitude) => !valueTechnologies.includes(aptitude)
        );
        setValueTechnologies((prevTechnologies) => [
          ...prevTechnologies,
          ...newAptitudes,
        ]);

        const expertiseAreas = extractExpertiseAreas(extractedText);
        const newExpertiseAreas = expertiseAreas.filter(
          (expertiseArea) => !valueExpertiseAreas.includes(expertiseArea)
        );
        const uniqueNewExpertiseAreas = [...new Set(newExpertiseAreas)];
        setValueExpertiseAreas((prevAreas) => [
          ...prevAreas,
          ...uniqueNewExpertiseAreas,
        ]);
      };

      reader.readAsArrayBuffer(file);

      setIsUploaded(true);
    } else {
      setErrorMessage("Por favor, selecciona un archivo PDF válido");
    }
  };

  const extractTechnologies = (text) => {
    const aptitudesIndex = text.indexOf("Aptitudes principales");
    if (aptitudesIndex !== -1) {
      const aptitudesText = text.slice(
        aptitudesIndex + "Aptitudes principales".length
      );
      const aptitudesArray = aptitudesText
        .split("\n")
        .filter((item) => item.trim().length > 0);
      const mainAptitudes = aptitudesArray.slice(0, 3); // Obtener las primeras 3 aptitudes
      return mainAptitudes;
    }
    return [];
  };

  const extractExpertiseAreas = (text) => {
    // Buscar la posición donde aparece el texto "Experiencia"
    const experienciaIndex = text.indexOf("Experiencia");

    if (experienciaIndex !== -1) {
      // Obtener el texto después de "Experiencia"
      const experienceText = text.slice(
        experienciaIndex + "Experiencia".length
      );

      // Dividir el texto en líneas y filtrar las líneas vacías
      const experienceLines = experienceText
        .split("\n")
        .filter((line) => line.trim().length > 0);

      // Crear un array para almacenar las áreas de experiencia
      let expertiseAreas = [];

      // Indicador para saber si se encontró un mes previamente
      let foundMonth = false;

      console.log(experienceLines);

      // Recorrer cada línea en el array de líneas de experiencia
      for (let i = 0; i < experienceLines.length; i++) {
        const line = experienceLines[i];

        // Verificar si la línea comienza con el nombre de un mes
        if (
          /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i.test(
            line
          )
        ) {
          // Marcar que se ha encontrado un mes previamente
          foundMonth = true;
        } else if (foundMonth && i > 0) {
          // Verificar si ya se encontró un mes previamente y estamos en una línea posterior a la primera
          const previousLine = experienceLines[i - 3]; // Línea anterior a la actual

          // Obtener la línea actual, eliminar espacios en blanco y verificar si no contiene "(" ni ")"
          const trimmedLine = line.trim();
          if (
            trimmedLine &&
            !trimmedLine.includes("(") &&
            !trimmedLine.includes(")")
          ) {
            // Agregar la línea anterior como un área de experiencia
            expertiseAreas.push(previousLine);

            // Restablecer el indicador de mes encontrado
            foundMonth = false;
          }
        }
      }

      return expertiseAreas; // Devolver el array de áreas de experiencia
    }

    return []; // Si no se encuentra "Experiencia", devolver un array vacío
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    setErrorMessage("");
    setIsUploaded(false);
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
            startIcon={<LinkedIn />}
            component="span"
            fullWidth
          >
            Cargar PDF de LinkedIn
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

export default Linkedin;
