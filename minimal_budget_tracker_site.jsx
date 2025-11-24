import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function BudgetTracker() {
  const [entries, setEntries] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("general");

  const addEntry = () => {
    if (!amount) return;
    const newEntry = {
      id: Date.now(),
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toLocaleDateString(),
    };
    setEntries([newEntry, ...entries]);
    setAmount("");
  };

  const monthlySummary = entries.reduce(
    (sum, e) => {
      if (e.type === "income") sum.income += e.amount;
      else sum.expenses += e.amount;
      return sum;
    },
    { income: 0, expenses: 0 }
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-center mb-4">Budget Tracker</h1>

        <Card className="p-4">
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <Select onValueChange={setType} defaultValue="income">
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setCategory} defaultValue="general">
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={addEntry}>Add</Button>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent>
            <h2 className="font-semibold text-xl mb-2">Monthly Summary</h2>
            <p>Income: {monthlySummary.income} ฿</p>
            <p>Expenses: {monthlySummary.expenses} ฿</p>
            <p className="font-semibold mt-2">Balance: {monthlySummary.income - monthlySummary.expenses} ฿</p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent>
            <h2 className="font-semibold text-xl mb-2">Daily Logs</h2>
            <div className="space-y-2">
              {entries.map((e) => (
                <div
                  key={e.id}
                  className="flex justify-between bg-white p-2 rounded shadow-sm"
                >
                  <span>{e.date}</span>
                  <span>{e.category}</span>
                  <span className={e.type === "income" ? "text-green-600" : "text-red-600"}>
                    {e.type === "income" ? "+" : "-"}
                    {e.amount} ฿
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
