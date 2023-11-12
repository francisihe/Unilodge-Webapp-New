import AddPropertyForm from "../components/forms/AddPropertyForm"


const AddProperty = () => {
    return (
        <div className="mt-6 space-y-3">
            <h1 className="font-bold text-2xl">
                Add New Property
            </h1>
            <p> Please use the form below to add a new property to the database.
                Please confirm that a property does not already exist to avoid duplicate entries.
                Some fields are marked required.
            </p>

            <AddPropertyForm />
        </div>
    )
}

export default AddProperty