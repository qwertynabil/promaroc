'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { switchToHost } from "@/app/actions/userActions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="bg-promaroc-green text-promaroc-white px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-promaroc-green/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? 'Switching to Hosting...' : 'Switch to Hosting'}
    </button>
  );
}

export function UpgradeButton() {
  return (
    <form action={switchToHost}>
      <SubmitButton />
    </form>
  );
}