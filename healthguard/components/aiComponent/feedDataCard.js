import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import { IoMdTrash } from "react-icons/io";

const FeedDataCard = ({}) => {
  const [statusMsg, setStatusMsg] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [appContent, setAppContent] = useState([]);
  const [reload, setReload] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsDataLoading(true);
    const fetchContentEntries = async () => {
      setIsDataLoading(true);
      const response = await fetch(`/api/db/document-crud`);
      const appContent = await response.json();

      console.log(response);
      setAppContent(appContent);
      setIsDataLoading(false);
    };

    fetchContentEntries();
  }, [reload]);

  const handleFileChange = async (event) => {
    setStatusMsg("Uploading & Processing file...");
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("pdfFile", file);

    const appContentEntry = {
      uploadId: uuidv4(),
      fileName: file.name,
      createdAt: new Date(),
    };

    console.log(appContentEntry);

    formData.append("uploadId", appContentEntry.uploadId);
    formData.append("filename", appContentEntry.fileName);

    try {
      const response = await fetch("/api/vector-db/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      await createContentEntry(appContentEntry);
      setStatusMsg("File Processed");
      setReload(!reload);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading PDF file:", error);
    }
  };

  async function createContentEntry(appContent) {
    const response = await fetch("/api/db/document-crud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appContent),
    });

    console.log(response);
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }

  async function handleDelete(id, uploadId) {
    // delete from vector db as well
    const vecDelete = await fetch(
      `/api/vector-db/vectorDelete?uploadId=${uploadId}`,
      {
        method: "DELETE",
      }
    );

    if (vecDelete.ok) {
      const response = await fetch(`/api/db/document-crud?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className="card w-4/5 p-8 my-4 bg-white rounded-lg shadow-md 
    relative z-10 border border-gray-200"
      >
        <p className="text-xl">Upload Documents Here</p>
        <div className="mt-4">
          <label htmlFor="appTitle" className="text-xs font-bold">
            Upload File
          </label>
          <form>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </form>
        </div>

        <div className="py-2">
          {isDataLoading ? (
            <>
              <p>Loading App Content...</p>
            </>
          ) : null}
          {appContent.map((content, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border-b"
            >
              <span>
                {content.filename ? content.filename : content.uploadId}
              </span>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => handleDelete(content._id, content.uploadId)}
              >
                <IoMdTrash className="mr-2" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4 space-x-2"></div>
        <div className="text-sm mt-2">{statusMsg}</div>
      </div>
    </div>
  );
};

export default FeedDataCard;
