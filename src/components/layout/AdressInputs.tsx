import { IAddress } from "@/src/models/User";

interface AdressInputsProps {
  adressInputsProps: IAddress;
  setCurrentAddress: React.Dispatch<React.SetStateAction<IAddress>>;
  disable: boolean;
}

export default function AdressInputs({
  adressInputsProps,
  setCurrentAddress,
  disable = false,
}: AdressInputsProps) {
  return (
    <>
      {" "}
      <div>
        <input
          disabled={disable}
          type="text"
          className="my-2"
          placeholder="Rua"
          value={adressInputsProps?.street}
          onChange={(ev) =>
            setCurrentAddress({
              ...adressInputsProps,
              street: ev.target?.value,
            })
          }
          required
        />
        <input
          disabled={disable}
          type="text"
          className="my-2"
          placeholder="Número"
          value={adressInputsProps?.number}
          onChange={(ev) =>
            setCurrentAddress({
              ...adressInputsProps,
              number: ev.target.value,
            })
          }
          required
        />
        <input
          disabled={disable}
          type="text"
          className="my-2"
          placeholder="Complemento"
          value={adressInputsProps?.complement}
          onChange={(ev) =>
            setCurrentAddress({
              ...adressInputsProps,
              complement: ev.target.value,
            })
          }
        />

        <input
          disabled={disable}
          type="text"
          className="my-2"
          placeholder="Bairro"
          value={adressInputsProps?.neighborhood}
          onChange={(ev) =>
            setCurrentAddress({
              ...adressInputsProps,
              neighborhood: ev.target.value,
            })
          }
        />
        <input
          disabled={disable}
          type="text"
          className="my-2"
          placeholder="Cidade"
          value={adressInputsProps?.city}
          onChange={(ev) =>
            setCurrentAddress({ ...adressInputsProps, city: ev.target.value })
          }
        />
        <input
          disabled={disable}
          type="text"
          className="my-2"
          placeholder="Estado"
          value={adressInputsProps?.state}
          onChange={(ev) =>
            setCurrentAddress({ ...adressInputsProps, state: ev.target.value })
          }
        />
        <input
          disabled={disable}
          type="text"
          className="my-2"
          placeholder="CEP"
          value={adressInputsProps?.zipCode}
          onChange={(ev) =>
            setCurrentAddress({
              ...adressInputsProps,
              zipCode: ev.target.value,
            })
          }
        />
      </div>
    </>
  );
}
