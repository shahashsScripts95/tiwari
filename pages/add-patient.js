import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AddPatient() {
    const router = useRouter();
    const [doctors, setDoctors] = useState();
    const [form, setForm] = useState({
        name: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        guardian: "",
        opdNumber: "",
        doctorId: "",
        discount: 0,
        allergy: "",
        visitValidity: "",
        priority: "",
        caseType: "",
        sittingLocation: "",
        religion: "",
        maritalStatus: "",
        dob: "",
        city: "",
        area: "",
        nationality: "",
        patientClass: "",
        referredBy: "",
        complaints: "",
        empanelment: "",
        cashPatient: false,
        appointmentBioReceipt: "",
        registrationNo: "",
        registrationType: "",
        consultant: "",
        department: "",
        time: "",
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get("/api/doctors");
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data before request:", form);
        try {
            const response = await axios.post("/api/patients", form);
            console.log("API response:", response);
            router.push("/patient-list");
        } catch (error) {
            console.error("Error adding patient:", error);
            if (error.response) {
                console.log("Server response data:", error.response.data);
                console.log("Server response status:", error.response.status);
                console.log("Server response headers:", error.response.headers);
            } else if (error.request) {
                console.log("Request made but no response received:", error.request);
            } else {
                console.log("Error setting up the request:", error.message);
            }
        }
    };

    const cancel = () => {
        router.push("/dashboard");
    };

    return (
        <div className="flex w-full justify-center items-center h-screen">
            <Card className="w-full max-w-[1400px] p-6"> {/* Adjust card width as needed */}
                <CardHeader>
                    <CardTitle>Add Patient</CardTitle>
                    <CardDescription>Enter patient details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-5  gap-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" >Name</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                type="number"
                                id="age"
                                name="age"
                                placeholder="Age"
                                value={form.age}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2" >
                            <Label htmlFor="gender">Gender</Label>
                            <Input
                                type="text"
                                id="gender"
                                name="gender"
                                placeholder="Gender"
                                value={form.gender}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="contact">Contact</Label>
                            <Input
                                type="text"
                                id="contact"
                                name="contact"
                                placeholder="Contact"
                                value={form.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-span-2 flex flex-col gap-2" >
                            <Label htmlFor="address">Address</Label>
                            <Input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Address"
                                value={form.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="guardian">Guardian</Label>
                            <Input
                                type="text"
                                id="guardian"
                                name="guardian"
                                placeholder="Guardian"
                                value={form.guardian}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="opdNumber">OPD Number</Label>
                            <Input
                                type="text"
                                id="opdNumber"
                                name="opdNumber"
                                placeholder="OPD Number"
                                value={form.opdNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="doctorId">Doctor</Label>
                            {doctors && doctors.length > 0 ? ( // Check if doctors is defined and not empty
                                <Select
                                    onValueChange={(value) => handleChange({ target: { name: "doctorId", value } })}
                                    value={form.doctorId}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Doctor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doc) => (
                                            <SelectItem key={doc._id} value={doc._id}>
                                                {doc.name} ({doc.department})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p>Loading doctors...</p> // Show a loading message while fetching
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="discount">Discount</Label>
                            <Input
                                type="number"
                                id="discount"
                                name="discount"
                                placeholder="Discount"
                                value={form.discount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="allergy">Allergy</Label>
                            <Input
                                type="text"
                                id="allergy"
                                name="allergy"
                                placeholder="Allergy"
                                value={form.allergy}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="visitValidity">Visit Validity</Label>
                            <Input
                                type="text"
                                id="visitValidity"
                                name="visitValidity"
                                placeholder="Visit Validity"
                                value={form.visitValidity}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Input
                                type="text"
                                id="priority"
                                name="priority"
                                placeholder="Priority"
                                value={form.priority}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="caseType">Case Type</Label>
                            <Input
                                type="text"
                                id="caseType"
                                name="caseType"
                                placeholder="Case Type"
                                value={form.caseType}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="sittingLocation">Sitting Location</Label>
                            <Input
                                type="text"
                                id="sittingLocation"
                                name="sittingLocation"
                                placeholder="Sitting Location"
                                value={form.sittingLocation}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="maritalStatus">Marital Status</Label>
                            <Input
                                type="text"
                                id="maritalStatus"
                                name="maritalStatus"
                                placeholder="Marital Status"
                                value={form.maritalStatus}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input
                                type="date"
                                id="dob"
                                name="dob"
                                placeholder="Date of Birth"
                                value={form.dob}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="City"
                                value={form.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="area">Area</Label>
                            <Input
                                type="text"
                                id="area"
                                name="area"
                                placeholder="Area"
                                value={form.area}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="nationality">Nationality</Label>
                            <Input
                                type="text"
                                id="nationality"
                                name="nationality"
                                placeholder="Nationality"
                                value={form.nationality}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="referredBy">Referred By</Label>
                            <Input
                                type="text"
                                id="referredBy"
                                name="referredBy"
                                placeholder="Referred By"
                                value={form.referredBy}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="consultant">Consultant</Label>
                            <Input
                                type="text"
                                id="consultant"
                                name="consultant"
                                placeholder="Consultant"
                                value={form.consultant}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="department">Department</Label>
                            <Input
                                type="text"
                                id="department"
                                name="department"
                                placeholder="Department"
                                value={form.department}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="time" >Time</Label>
                            <Input
                                type="text"
                                id="time"
                                name="time"
                                placeholder="Time"
                                value={form.time}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" className="col-span-2 cursor-pointer">
                            Save
                        </Button>
                    </form>
                    <Button onClick={cancel} className="bg-red-700  hover:bg-red-600 text-white font-semibold px-2 m-2 cursor-pointer rounded-lg shadow-md w-127 ml-[-1]">
                        Cancel
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}