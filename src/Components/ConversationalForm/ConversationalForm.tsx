import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAnimalTypes,
  fetchBreeds,
  fetchAnimalsByBreed,
  fetchCompletedFormResults,
} from "../../utils/apiRequests";
import "./ConversationalForm.css";
import { PiBarnThin, PiRabbit, PiPawPrintDuotone } from "react-icons/pi";
import {
  GiFishScales,
  GiHorseHead,
  GiBirdHouse,
  GiBalloonDog,
  GiCat,
} from "react-icons/gi";

// Shape of form data: multiple types & breeds supported
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
  Dog: <GiBalloonDog />,
  Cat: <GiCat />,
  Rabbit: <PiRabbit />,
  "Small & Furry": <PiPawPrintDuotone />,
  Horse: <GiHorseHead />,
  Bird: <GiBirdHouse />,
  "Scales, Fins & Other": <GiFishScales />,
  Barnyard: <PiBarnThin />,
};

export default function ConversationalForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [animalTypes, setAnimalTypes] = useState<string[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [coats, setCoats] = useState<string[]>([]);
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
      question:
        "🌸 Hello, I'm Samantha. What kind of companion are you dreaming of today?",
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
      render: () => (
        <select
          multiple
          size={6}
          className="breed-select"
          value={formData.breed}
          onChange={(e) => {
            const opts = Array.from(e.target.selectedOptions).map(
              (o) => o.value
            );
            setFormData((p) => ({ ...p, breed: opts }));
          }}
        >
          {breeds.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      ),
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
          {["male", "female", "unknown"].map((g) => (
            <button
              key={g}
              className={`icon-button ${
                formData.gender === g ? "selected" : ""
              }`}
              onClick={() => setFormData((p) => ({ ...p, gender: g }))}
            >
              {g}
            </button>
          ))}
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
