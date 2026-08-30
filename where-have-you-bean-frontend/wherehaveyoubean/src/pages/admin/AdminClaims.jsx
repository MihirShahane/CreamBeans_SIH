import { useState } from 'react'

const initialClaims = [
  { id: 'c1', item: 'Black Laptop (Dell)', claimant: 'Ananya Rao', answer: 'CS Club sticker on the lid', status: 'pending' },
  { id: 'c2', item: 'Student ID Card', claimant: 'Rohit Sharma', answer: 'First name: Rohit', status: 'pending' },
  { id: 'c3', item: 'Green Steel Bottle', claimant: 'Devansh Patel', answer: 'Dent near the base cap', status: 'pending' },
]

export default function AdminClaims() {
  const [claims, setClaims] = useState(initialClaims)

  const resolve = (id, status) => {
    setClaims((cs) => cs.map((c) => (c.id === id ? { ...c, status } : c)))
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-cream mb-1">Claims Review</h1>
      <p className="text-parchment mb-6">Verify ownership answers before releasing contact details.</p>

      <div className="bg-espresso-800 border border-espresso-700 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-espresso-700/50 text-parchment text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Item</th>
              <th className="text-left px-5 py-3 font-medium">Claimant</th>
              <th className="text-left px-5 py-3 font-medium">Answer</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-espresso-700">
            {claims.map((c) => (
              <tr key={c.id}>
                <td className="px-5 py-4 text-cream">{c.item}</td>
                <td className="px-5 py-4 text-parchment">{c.claimant}</td>
                <td className="px-5 py-4 text-parchment max-w-xs truncate">{c.answer}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full capitalize ${
                    c.status === 'pending' ? 'bg-bean-500/20 text-bean-300' :
                    c.status === 'approved' ? 'bg-sprout-500/20 text-sprout-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => resolve(c.id, 'approved')}
                    disabled={c.status !== 'pending'}
                    className="text-xs font-medium bg-sprout-500 text-espresso-950 hover:opacity-90 disabled:opacity-30 transition-opacity px-3 py-1.5 rounded-full"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => resolve(c.id, 'rejected')}
                    disabled={c.status !== 'pending'}
                    className="text-xs font-medium border border-espresso-600 text-parchment hover:text-cream disabled:opacity-30 transition-colors px-3 py-1.5 rounded-full"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
