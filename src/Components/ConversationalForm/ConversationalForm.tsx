import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAnimalTypes,
  fetchBreeds,
  fetchAnimalsByBreed,
  fetchCompletedFormResults,
} from "../../utils/apiRequests";
import "./ConversationalForm.css";
import {
  PiBarnThin,
  PiBird,
  PiRabbit,
  PiPawPrintDuotone,
  PiDogFill,
  PiCat,
} from "react-icons/pi";
import { GiFishScales } from "react-icons/gi";
import { LiaHorseHeadSolid } from "react-icons/lia";
import { FaMars, FaVenus, FaGenderless } from "react-icons/fa";

interface FormData {
  type: string[];
  breed: string[];
  size: string;
  coat: string;
  gender: string;
  age: string;
  location: string;
  distance: string;
  goodWithChildren: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
  spayedNeutered: boolean;
  houseTrained: boolean;
  specialNeeds: boolean;
  shotsCurrent: boolean;
}

const initialData: FormData = {
  type: [],
  breed: [],
  size: "",
  coat: "",
  gender: "",
  age: "",
  location: "",
  distance: "0",
  goodWithChildren: false,
  goodWithDogs: false,
  goodWithCats: false,
  spayedNeutered: false,
  houseTrained: false,
  specialNeeds: false,
  shotsCurrent: false,
};

// Icon mappings for animal types
const icons: Record<string, JSX.Element> = {
  Dog: <PiDogFill />,
  Cat: <PiCat />,
  Rabbit: <PiRabbit />,
  "Small & Furry": <PiPawPrintDuotone />,
  Horse: <LiaHorseHeadSolid />,
  Bird: <PiBird />,
  "Scales, Fins & Other": <GiFishScales />,
  Barnyard: <PiBarnThin />,
};

// Icons for gender preferences
const genderIcons: Record<string, JSX.Element> = {
  male: <FaMars />,
  female: <FaVenus />,
  unknown: <FaGenderless />,
};

export default function ConversationalForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [animalTypes, setAnimalTypes] = useState<string[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [coats, setCoats] = useState<string[]>([]);
  const [breedQuery, setBreedQuery] = useState("");

  // Fetch animal types once
  useEffect(() => {
    const fetchData = async () => {
      const types = await fetchAnimalTypes();
      setAnimalTypes(types);
    };
    fetchData();
  }, []);

  // When user selects types, fetch breeds for all selected
  useEffect(() => {
    if (formData.type.length > 0) {
      Promise.all(formData.type.map((t) => fetchBreeds(t))).then((arrs) => {
        const allBreeds = arrs.flat();
        setBreeds(Array.from(new Set(allBreeds)));
      });
    } else {
      // Clear breeds when no type selected
      setBreeds([]);
      setFormData((prev) => ({ ...prev, breed: [] }));
    }
  }, [formData.type]);

  // When breeds change, compute sizes & coats
  useEffect(() => {
    if (formData.breed.length > 0) {
      Promise.all(formData.breed.map((b) => fetchAnimalsByBreed(b))).then(
        (arrs) => {
          const all = arrs.flat();
          setSizes(Array.from(new Set(all.map((a) => a.size))));
          setCoats(Array.from(new Set(all.map((a) => a.coat))));
        }
      );
    } else {
      setSizes([]);
      setCoats([]);
    }
  }, [formData.breed]);

  // Steps definition
  const steps: {
    key: keyof FormData;
    question: string;
    render: () => JSX.Element;
  }[] = [
    {
      key: "type",
      question: "What kind of companion are you dreaming of?",
      render: () => (
        <div className="icon-grid">
          {animalTypes.map((t) => {
            const sel = formData.type.includes(t);
            return (
              <button
                key={t}
                data-label={t}
                className={`icon-button ${sel ? "selected" : ""}`}
                onClick={() =>
                  setFormData((p) => ({
                    ...p,
                    type: p.type.includes(t)
                      ? p.type.filter((x) => x !== t)
                      : [...p.type, t],
                  }))
                }
              >
                {icons[t] || t}
              </button>
            );
          })}
        </div>
      ),
    },
    {
      key: "breed",
      question: "🐶 Lovely choice! Now, which breed calls to your heart?",
      render: () => {
        // filter by query
        const filtered = breeds.filter((b) =>
          b.toLowerCase().includes(breedQuery.toLowerCase())
        );
        return (
          <>
            <input
              className="breed-search"
              type="text"
              value={breedQuery}
              onChange={(e) => setBreedQuery(e.target.value)}
              placeholder="Search breeds..."
            />
            <div className="breed-options">
              {filtered.map((b) => (
                <label key={b} className="breed-option">
                  <input
                    type="checkbox"
                    checked={formData.breed.includes(b)}
                    onChange={() => {
                      setFormData((p) => {
                        const next = p.breed.includes(b)
                          ? p.breed.filter((x) => x !== b)
                          : [...p.breed, b];
                        return { ...p, breed: next };
                      });
                    }}
                  />
                  {b}
                </label>
              ))}
            </div>
            <div className="selected-breeds">
              {formData.breed.map((b) => (
                <span key={b} className="breed-tag">
                  {b}
                </span>
              ))}
            </div>
          </>
        );
      },
    },
    {
      key: "size",
      question: "📏 What size pet would fit your world best?",
      render: () => (
        <select
          value={formData.size}
          onChange={(e) => setFormData((p) => ({ ...p, size: e.target.value }))}
        >
          <option value="">-- Select size --</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "coat",
      question: "🧥 What coat type do you prefer?",
      render: () => (
        <select
          value={formData.coat}
          onChange={(e) => setFormData((p) => ({ ...p, coat: e.target.value }))}
        >
          <option value="">-- Choose coat --</option>
          {coats.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "gender",
      question: "⚧ Any gender preference?",
      render: () => (
        <div className="icon-grid">
          {Object.entries(genderIcons).map(([g, icon]) => {
            const sel = formData.gender === g;
            const label = g.charAt(0).toUpperCase() + g.slice(1);
            return (
              <button
                key={g}
                data-label={label}
                className={`icon-button ${sel ? "selected" : ""}`}
                onClick={() => setFormData((p) => ({ ...p, gender: g }))}
              >
                {icon}
              </button>
            );
          })}
        </div>
      ),
    },
    {
      key: "age",
      question: "⏳ What age suits you?",
      render: () => (
        <div className="icon-grid">
          {["baby", "young", "adult", "senior"].map((a) => (
            <button
              key={a}
              className={`icon-button ${formData.age === a ? "selected" : ""}`}
              onClick={() => setFormData((p) => ({ ...p, age: a }))}
            >
              {a}
            </button>
          ))}
        </div>
      ),
    },
    {
      key: "location",
      question: "📍 Where should I look for your future friend?",
      render: () => (
        <input
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData((p) => ({ ...p, location: e.target.value }))
          }
          placeholder="City, state, or zip"
        />
      ),
    },
    {
      key: "distance",
      question: `🚗 How far are you willing to travel? (${formData.distance} miles)`,
      render: () => (
        <input
          type="range"
          min="0"
          max="500"
          value={formData.distance}
          onChange={(e) =>
            setFormData((p) => ({ ...p, distance: e.target.value }))
          }
        />
      ),
    },
  ];

  const isLast = step === steps.length - 1;
  const isFirst = step === 0;
  const isSecond = step === 1;
  const isLocation = step === 6;

  const handleNext = async () => {
    if (isLast) {
      const params = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => {
        if (Array.isArray(v) && v.length) params.append(k, v.join(","));
        else if (typeof v === "boolean" && v) params.append(k, "true");
        else if (v !== "" && v != null) params.append(k, String(v));
      });
      const data = await fetchCompletedFormResults(params);
      navigate("/results", { state: data });
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSkip = () => setStep((s) => s + 1);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p className="question">{steps[step].question}</p>
        <div className="input-group">{steps[step].render()}</div>
        <div className="button-group">
          {step > 0 && (
            <button className="btn-back" onClick={() => setStep((s) => s - 1)}>
              ⬅ Back
            </button>
          )}
          {step >= 2 && !isLast && (
            <button className="btn-skip" onClick={handleSkip}>
              Skip
            </button>
          )}
          <button
            className="btn"
            onClick={handleNext}
            disabled={
              (isFirst && formData.type.length === 0) ||
              (isSecond && formData.breed.length === 0) ||
              (isLocation && !formData.location)
            }
          >
            {isLast ? "✨ Find Pets" : "Next ➡️"}
          </button>
        </div>
      </div>
    </div>
  );
}
