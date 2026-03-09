// Example (models/Patient.js)
import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    contact: String,
    address: String,
    guardian: String,
    opdNumber: String,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    discount: Number,
    finalFee: Number,
    visitValidity: String,
    priority: String,
    caseType: String,
    maritalStatus: String,
    dob: Date,
    city: String,
    area: String,
    nationality: String,
    patientClass: String,
    referredBy: String,
    complaints: String,
    empanelment: String,
    appointmentBioReceipt: String,
    registrationNo: String,
    registrationType: String,
    consultant: String,
    department: String,
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdated' } });

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);