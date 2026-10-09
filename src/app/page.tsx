"use client";

import { useState } from "react";

type ReferralStatus = 
  | "requested"
  | "scheduled"
  | "completed"
  | "cancelled";

type FilterValue = "all" | ReferralStatus;

type Referral = {
  id: string;
  patientName: string;
  specialty: string;
  status: ReferralStatus;
}

const referrals: Referral[] = [
{
  id:"R001",
  patientName:"Taylor Reed",
  specialty:"Cardiology",
  status:"requested",
  },
  {
    id:"R002",
    patientName:"Morgan Chen",
    specialty:"Psysiotherapy",
    status:"scheduled",
  },
  {
    id:"R003",
    patientName:"Jordan Patel",
    specialty:"Dermatology",
    status:"completed",
  },
];

function ReferralList({ items }: { items: Referral[] }) {
  if(items.length === 0) {
    return <p>No referrals match this status</p>
  }

  return (
    <ul className="space-y-3">
      {items.map((referral) => (
        <li key={referral.id} className="rounded-lg border p-4">
          <h2 className="font-semibold">
            {referral.patientName}
          </h2>
          <p>{referral.specialty}</p>
          <p className="capitalize">{referral.status}</p>
        </li>
      ))}
    </ul>
  );
}

type StatusFilterProps = {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
};

function StatusFilter({value, onChange} : StatusFilterProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="status-filter" className="block">
        Filter by status:
        </label>
        <select
        id="referral-status"
        value={value}
        onChange={(event) => {
          const next = event.target.value;
          if(
            next === "all" ||
            next === "requested" ||
            next === "scheduled" ||
            next === "completed" ||
            next === "cancelled"
          ) {
            onChange(next);
          }
        }}
        className="rounded border bg-white p-2 text-slate-900"
        >
          <option value="all">All statuses</option>
          <option value="requested">Requested</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
    </div>
  );
}

export default function Home() {
  const [status, setStatus] = useState<FilterValue>("all");

  const visibleReferrals = referrals.filter(
    (referral) => status === "all" || referral.status === status
  );
  return (
    <main className="min-h-screen bg-white p-6 text-slate-900">
      <div className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">CareFlow</h1>
      <p>Referral queue using fictional patient data</p>
      <StatusFilter value={status} onChange={setStatus} />
      <p role="status">
        Showing {visibleReferrals.length} of {referrals.length}
      </p>
      <ReferralList items={visibleReferrals} />
      </div>
    </main>

  );
}