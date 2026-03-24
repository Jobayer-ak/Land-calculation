/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calculator, MinusCircle, PlusCircle, Users } from 'lucide-react';
import { useState } from 'react';

// Conversion factors
const GONDA_PER_ANA = 20;
const KORA_PER_GONDA = 4;
const KRANTI_PER_KORA = 3;
const TIL_PER_KRANTI = 20;
const SQFT_PER_DECIMAL = 435.6; // 1 decimal = 435.6 sqft
const SQFT_PER_GONDA = 864; // 1 gonda = 864 sqft

// আনার জন্য প্রতীক (০-১৬)
const anaSymbols: Record<number, string> = {
  0: '০',
  1: '⁄',
  2: '৵',
  3: '৶',
  4: '৷',
  5: '৷⁄',
  6: '৷৵',
  7: '৷৶',
  8: '৷৷',
  9: '৷৷⁄',
  10: '৷৷৵',
  11: '৷৷৶',
  12: '৸',
  13: '৸⁄',
  14: '৸৵',
  15: '৸৶',
  16: '১্',
};

// কড়ার জন্য প্রতীক (০-৩)
const koraSymbols: Record<number, string> = {
  0: '০',
  1: '৷',
  2: '৷৷',
  3: '৸',
};

// ক্রান্তির জন্য প্রতীক (০-২)
const krantiSymbols: Record<number, string> = {
  0: '০',
  1: '৴',
  2: '৴৴',
};

// Generate options for select fields with symbols
const anaOptions = Array.from({ length: 17 }, (_, i) => i); // 0-16
const gondaOptions = Array.from({ length: 20 }, (_, i) => i); // 0-19
const koraOptions = Array.from({ length: 4 }, (_, i) => i); // 0-3
const krantiOptions = Array.from({ length: 3 }, (_, i) => i); // 0-2
const tilOptions = Array.from({ length: 20 }, (_, i) => i); // 0-19

interface LandAmount {
  ana: number;
  gonda: number;
  kora: number;
  kranti: number;
  til: number;
}

interface Owner {
  id: string;
  name: string;
  landAmount: LandAmount; // আনা-গন্ডায় জমির পরিমাণ (দলিল অনুযায়ী)
  shareValue: number; // অংশের মান (১ এর মধ্যে কত অংশ) - দশমিক আকারে
  percentage: number; // শতাংশ
  decimalValue: number; // দশমিকে জমির পরিমাণ
}

export function DynamicOwner() {
  const [totalDecimal, setTotalDecimal] = useState<number>(150); // মোট জমি দশমিকে (ডিফল্ট ১৫০)
  const [totalLandInGonda, setTotalLandInGonda] = useState<number>(0); // মোট জমি গন্ডায়
  const [totalLandInTil, setTotalLandInTil] = useState<number>(0); // মোট জমি তিলে

  const [owners, setOwners] = useState<Owner[]>([
    {
      id: crypto.randomUUID ? crypto.randomUUID() : `owner-${Date.now()}-1`,
      name: 'মালিক ১',
      landAmount: { ana: 0, gonda: 0, kora: 0, kranti: 0, til: 0 },
      shareValue: 0,
      percentage: 0,
      decimalValue: 0,
    },
  ]);

  const [showResult, setShowResult] = useState<boolean>(false);

  // Conversion functions
  const convertToTil = (land: LandAmount): number => {
    return (
      land.ana *
        GONDA_PER_ANA *
        KORA_PER_GONDA *
        KRANTI_PER_KORA *
        TIL_PER_KRANTI +
      land.gonda * KORA_PER_GONDA * KRANTI_PER_KORA * TIL_PER_KRANTI +
      land.kora * KRANTI_PER_KORA * TIL_PER_KRANTI +
      land.kranti * TIL_PER_KRANTI +
      land.til
    );
  };

  const convertFromTil = (totalTil: number): LandAmount => {
    let remaining = totalTil;

    const ana = Math.floor(
      remaining /
        (GONDA_PER_ANA * KORA_PER_GONDA * KRANTI_PER_KORA * TIL_PER_KRANTI),
    );
    remaining =
      remaining %
      (GONDA_PER_ANA * KORA_PER_GONDA * KRANTI_PER_KORA * TIL_PER_KRANTI);

    const gonda = Math.floor(
      remaining / (KORA_PER_GONDA * KRANTI_PER_KORA * TIL_PER_KRANTI),
    );
    remaining = remaining % (KORA_PER_GONDA * KRANTI_PER_KORA * TIL_PER_KRANTI);

    const kora = Math.floor(remaining / (KRANTI_PER_KORA * TIL_PER_KRANTI));
    remaining = remaining % (KRANTI_PER_KORA * TIL_PER_KRANTI);

    const kranti = Math.floor(remaining / TIL_PER_KRANTI);
    const til = remaining % TIL_PER_KRANTI;

    return { ana, gonda, kora, kranti, til };
  };

  // Calculate totals from all owners with normalization
  const calculateFieldTotals = () => {
    let totalTilSum = 0;

    owners.forEach((owner) => {
      totalTilSum += convertToTil(owner.landAmount);
    });

    const normalizedTotals = convertFromTil(totalTilSum);

    return {
      anaSum: normalizedTotals.ana,
      gondaSum: normalizedTotals.gonda,
      koraSum: normalizedTotals.kora,
      krantiSum: normalizedTotals.kranti,
      tilSum: normalizedTotals.til,
    };
  };

  const totals = calculateFieldTotals();

  // মোট দশমিক জমি পরিবর্তন
  const handleTotalDecimalChange = (value: string) => {
    const newTotal = parseFloat(value) || 0;
    setTotalDecimal(newTotal);

    // দশমিক থেকে গন্ডা ও তিলে রূপান্তর
    const totalSqft = newTotal * SQFT_PER_DECIMAL;
    const totalGonda = totalSqft / SQFT_PER_GONDA;
    setTotalLandInGonda(totalGonda);

    // তিলে রূপান্তর (সঠিক হিসাবের জন্য)
    const totalTil =
      totalGonda * KORA_PER_GONDA * KRANTI_PER_KORA * TIL_PER_KRANTI;
    setTotalLandInTil(totalTil);

    setShowResult(false);
  };

  // Handle owner land change with auto-normalization
  const handleOwnerLandChange = (
    ownerId: string,
    field: keyof LandAmount,
    value: string,
  ) => {
    const numericValue = parseInt(value, 10);
    const newValue = isNaN(numericValue) ? 0 : numericValue;

    setOwners((prev) =>
      prev.map((owner) => {
        if (owner.id === ownerId) {
          const updatedLandAmount = {
            ana: owner.landAmount?.ana || 0,
            gonda: owner.landAmount?.gonda || 0,
            kora: owner.landAmount?.kora || 0,
            kranti: owner.landAmount?.kranti || 0,
            til: owner.landAmount?.til || 0,
            [field]: newValue,
          };

          // Convert to til and back to normalize
          const totalTil = convertToTil(updatedLandAmount);
          const normalized = convertFromTil(totalTil);

          return {
            ...owner,
            landAmount: normalized,
          };
        }
        return owner;
      }),
    );
    setShowResult(false);
  };

  // Owner name change handler
  const handleOwnerNameChange = (ownerId: string, value: string) => {
    setOwners((prev) =>
      prev.map((owner) =>
        owner.id === ownerId ? { ...owner, name: value } : owner,
      ),
    );
  };

  // Add new owner
  const addOwner = () => {
    const newId = crypto.randomUUID
      ? crypto.randomUUID()
      : `owner-${Date.now()}-${owners.length + 1}`;
    const newOwner: Owner = {
      id: newId,
      name: `মালিক ${owners.length + 1}`,
      landAmount: { ana: 0, gonda: 0, kora: 0, kranti: 0, til: 0 },
      shareValue: 0,
      percentage: 0,
      decimalValue: 0,
    };

    setOwners([...owners, newOwner]);
    setShowResult(false);
  };

  // Remove owner
  const removeOwner = (ownerId: string) => {
    if (owners.length <= 1) {
      alert('অন্তত একজন মালিক থাকতে হবে');
      return;
    }

    setOwners(owners.filter((owner) => owner.id !== ownerId));
    setShowResult(false);
  };

  // Calculate distribution
  const calculateDistribution = () => {
    if (totalDecimal <= 0) {
      alert('দয়া করে মোট জমির পরিমাণ দশমিকে দিন');
      return;
    }

    // Check if any owner has land
    const hasLand = owners.some(
      (owner) =>
        owner.landAmount.ana > 0 ||
        owner.landAmount.gonda > 0 ||
        owner.landAmount.kora > 0 ||
        owner.landAmount.kranti > 0 ||
        owner.landAmount.til > 0,
    );

    if (!hasLand) {
      alert('দয়া করে অন্তত একজন মালিকের জমির পরিমাণ নির্বাচন করুন');
      return;
    }

    // প্রতি মালিকের জমি তিলে রূপান্তর
    const ownersInTil = owners.map((owner) => {
      const til =
        owner.landAmount.ana *
          GONDA_PER_ANA *
          KORA_PER_GONDA *
          KRANTI_PER_KORA *
          TIL_PER_KRANTI +
        owner.landAmount.gonda *
          KORA_PER_GONDA *
          KRANTI_PER_KORA *
          TIL_PER_KRANTI +
        owner.landAmount.kora * KRANTI_PER_KORA * TIL_PER_KRANTI +
        owner.landAmount.kranti * TIL_PER_KRANTI +
        owner.landAmount.til;

      return {
        ...owner,
        tilValue: til,
      };
    });

    // মোট তিলের পরিমাণ (দলিল অনুযায়ী)
    const totalTilFromDocs = ownersInTil.reduce(
      (sum, owner) => sum + owner.tilValue,
      0,
    );

    if (totalTilFromDocs === 0) {
      alert('মোট জমির পরিমাণ ০ হতে পারে না');
      return;
    }

    // আপডেটেড owners অ্যারে তৈরি
    const updatedOwners = ownersInTil.map((owner) => {
      // অংশের মান (১ এর মধ্যে কত অংশ) = (মালিকের জমি / মোট দলিলের জমি)
      const shareValue = owner.tilValue / totalTilFromDocs;

      // শতাংশ = (মালিকের জমি / মোট দলিলের জমি) * ১০০
      const percentage = (owner.tilValue / totalTilFromDocs) * 100;

      // দশমিকে জমির পরিমাণ = (মালিকের জমি / মোট দলিলের জমি) * মোট দশমিক জমি
      const decimalValue = (owner.tilValue / totalTilFromDocs) * totalDecimal;

      return {
        ...owner,
        shareValue,
        percentage,
        decimalValue,
      };
    });

    setOwners(updatedOwners);
    setShowResult(true);
  };

  // Reset calculator
  const resetCalculator = () => {
    setTotalDecimal(150);
    setTotalLandInGonda(0);
    setTotalLandInTil(0);
    setOwners([
      {
        id: crypto.randomUUID ? crypto.randomUUID() : `owner-${Date.now()}-1`,
        name: 'মালিক ১',
        landAmount: { ana: 0, gonda: 0, kora: 0, kranti: 0, til: 0 },
        shareValue: 0,
        percentage: 0,
        decimalValue: 0,
      },
    ]);
    setShowResult(false);
  };

  // Helper function to get land display
  const getLandDisplay = (land: LandAmount) => {
    const parts = [];
    if (land.ana) parts.push(`${land.ana} আনা (${anaSymbols[land.ana]})`);
    if (land.gonda) parts.push(`${land.gonda} গন্ডা`);
    if (land.kora) parts.push(`${land.kora} কড়া (${koraSymbols[land.kora]})`);
    if (land.kranti)
      parts.push(`${land.kranti} ক্রান্তি (${krantiSymbols[land.kranti]})`);
    if (land.til) parts.push(`${land.til} তিল`);
    return parts.length ? parts.join(' ') : '০ আনা';
  };

  // Calculate total of share values to verify it equals 1
  const totalShareSum = owners.reduce(
    (sum, owner) => sum + owner.shareValue,
    0,
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
          <Users className="h-6 w-6" />
          আনা গন্ডা যৌথ মালিকের তফসিল ক্যালকুলেটর
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Total Land Section */}
          <div className="border rounded-lg p-4 bg-muted/30">
            <h3 className="text-lg font-semibold mb-3">মোট জমির পরিমাণ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total-decimal">মোট জমি (দশমিকে)</Label>
                <Input
                  id="total-decimal"
                  type="number"
                  step="0.01"
                  min="0"
                  value={totalDecimal}
                  onChange={(e) => handleTotalDecimalChange(e.target.value)}
                  placeholder="যেমন: ১৫০"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Owners Section */}
          <div className="space-y-4">
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {owners.map((owner, index) => (
                <div key={owner.id} className="border rounded-lg p-3 bg-card">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-2xl">
                        <Input
                          value={owner.name}
                          onChange={(e) =>
                            handleOwnerNameChange(owner.id, e.target.value)
                          }
                          className="flex-1"
                          placeholder="মালিকের নাম"
                        />
                        <Button
                          onClick={() => removeOwner(owner.id)}
                          variant="ghost"
                          size="icon"
                          className=" cursor-pointer bg-gray-600 hover:bg-red-500 text-white"
                          disabled={owners.length <= 1}
                        >
                          <MinusCircle className="h-6 w-6" />
                        </Button>
                      </div>

                      {/* Land Amount Input (আনা-গন্ডা with symbols) */}
                      <div className="mt-2">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                          {/* আনা সিলেক্ট with symbols */}
                          <div className="flex justify-center items-center gap-2">
                            <Label
                              htmlFor={`owner-${owner.id}-ana`}
                              className="text-lg font-semibold"
                            >
                              আনা
                            </Label>
                            <Select
                              value={owner.landAmount?.ana.toString() || '0'}
                              onValueChange={(value) =>
                                handleOwnerLandChange(owner.id, 'ana', value)
                              }
                            >
                              <SelectTrigger
                                id={`owner-${owner.id}-ana`}
                                className="h-8"
                              >
                                <SelectValue placeholder="০" />
                              </SelectTrigger>
                              <SelectContent>
                                {anaOptions.map((option) => (
                                  <SelectItem
                                    key={option}
                                    value={option.toString()}
                                  >
                                    {option} = {anaSymbols[option]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* গন্ডা সিলেক্ট (numbers only) */}
                          <div className="flex justify-center items-center gap-2">
                            <Label
                              htmlFor={`owner-${owner.id}-gonda`}
                              className="text-lg font-semibold"
                            >
                              গন্ডা
                            </Label>
                            <Select
                              value={owner.landAmount?.gonda.toString() || '0'}
                              onValueChange={(value) =>
                                handleOwnerLandChange(owner.id, 'gonda', value)
                              }
                            >
                              <SelectTrigger
                                id={`owner-${owner.id}-gonda`}
                                className="h-8"
                              >
                                <SelectValue placeholder="০" />
                              </SelectTrigger>
                              <SelectContent>
                                {gondaOptions.map((option) => (
                                  <SelectItem
                                    key={option}
                                    value={option.toString()}
                                  >
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* কড়া সিলেক্ট with symbols */}
                          <div className="flex justify-center items-center gap-2">
                            <Label
                              htmlFor={`owner-${owner.id}-kora`}
                              className="text-lg font-semibold"
                            >
                              কড়া
                            </Label>
                            <Select
                              value={owner.landAmount?.kora.toString() || '0'}
                              onValueChange={(value) =>
                                handleOwnerLandChange(owner.id, 'kora', value)
                              }
                            >
                              <SelectTrigger
                                id={`owner-${owner.id}-kora`}
                                className="h-8"
                              >
                                <SelectValue placeholder="০" />
                              </SelectTrigger>
                              <SelectContent>
                                {koraOptions.map((option) => (
                                  <SelectItem
                                    key={option}
                                    value={option.toString()}
                                  >
                                    {option} = {koraSymbols[option]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* ক্রান্তি সিলেক্ট with symbols */}
                          <div className="flex justify-center items-center gap-2">
                            <Label
                              htmlFor={`owner-${owner.id}-kranti`}
                              className="text-lg font-semibold"
                            >
                              ক্রান্তি
                            </Label>
                            <Select
                              value={owner.landAmount?.kranti.toString() || '0'}
                              onValueChange={(value) =>
                                handleOwnerLandChange(owner.id, 'kranti', value)
                              }
                            >
                              <SelectTrigger
                                id={`owner-${owner.id}-kranti`}
                                className="h-8"
                              >
                                <SelectValue placeholder="০" />
                              </SelectTrigger>
                              <SelectContent>
                                {krantiOptions.map((option) => (
                                  <SelectItem
                                    key={option}
                                    value={option.toString()}
                                  >
                                    {option} = {krantiSymbols[option]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* তিল সিলেক্ট (numbers only) */}
                          <div className="flex justify-center items-center gap-2">
                            <Label
                              htmlFor={`owner-${owner.id}-til`}
                              className="text-lg font-semibold"
                            >
                              তিল
                            </Label>
                            <Select
                              value={owner.landAmount?.til.toString() || '0'}
                              onValueChange={(value) =>
                                handleOwnerLandChange(owner.id, 'til', value)
                              }
                            >
                              <SelectTrigger
                                id={`owner-${owner.id}-til`}
                                className="h-8"
                              >
                                <SelectValue placeholder="০" />
                              </SelectTrigger>
                              <SelectContent>
                                {tilOptions.map((option) => (
                                  <SelectItem
                                    key={option}
                                    value={option.toString()}
                                  >
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Show result for this owner if calculated */}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                মালিকগণ ({owners.length} জন)
              </h3>
              <Button
                onClick={addOwner}
                variant="outline"
                size="sm"
                className="cursor-pointer bg-gray-600 hover:bg-green-600 text-white"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                নতুন মালিক যোগ করুন
              </Button>
            </div>
          </div>

          <div className="flex justify-evenly gap-2">
            <p>আনা = {totals.anaSum} </p>
            <p>গন্ডা = {totals.gondaSum}</p>
            <p>করা = {totals.koraSum}</p>
            <p>ক্রান্তি = {totals.krantiSum}</p>
            <p>তিল = {totals.tilSum}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={calculateDistribution}
              className="flex-1 text-lg bg-amber-600 text-black font-bold cursor-pointer hover:text-white"
              size="lg"
            >
              <Calculator className="h-4 w-4 mr-2" />
              হিস্যা বের করুন
            </Button>
            <Button
              onClick={resetCalculator}
              variant="outline"
              className="flex-1 text-lg font-bold text-black cursor-pointer bg-green-400 hover:bg-red-600 hover:text-white "
              size="lg"
            >
              রিসেট করুন
            </Button>
          </div>

          {/* Summary Result */}
          {showResult && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-xl bg-amber-600 py-4 text-primary mb-4 flex justify-center">
                হিস্যার ফলাফল (সারসংক্ষেপ):
              </h4>
              <div className="space-y-3">
                <div className="text-lg grid grid-cols-3 gap-2 font-semibold border-b border-green-500 pb-2">
                  <div>মালিকের নাম</div>
                  <div>অংশ (১ এর মধ্যে)</div>
                  {/* <div>শতাংশ</div> */}
                  <div>খতিয়ানে মালিকের জমির পরিমাণ </div>
                </div>
                {owners.map((owner) => (
                  <div
                    key={owner.id}
                    className="grid grid-cols-3 gap-2 text-sm border-b border-green-500 last:border-0 pb-2 last:pb-0"
                  >
                    <div className="font-bold text-lg ">{owner.name}</div>
                    <div className="text-lg text-red-600 font-bold dark:text-purple-400">
                      {owner.shareValue.toFixed(6)}
                    </div>
                    {/* <div className="text-blue-600 dark:text-blue-400">
                      {owner.percentage.toFixed(4)}%
                    </div> */}
                    <div className="text-lg text-purple-600 font-bold  dark:text-green-400">
                      {owner.decimalValue.toFixed(3)} শতক
                    </div>
                  </div>
                ))}

                {/* Total Row - shows sum of shares = 1 */}
                <div className="grid grid-cols-3 gap-2 text-lg font-semibold pt-2 border-t">
                  <div>মোট</div>
                  <div className="text-purple-600 dark:text-purple-400">
                    {totalShareSum.toFixed(6)}
                  </div>
                  {/* <div className="text-blue-600 dark:text-blue-400">১০০%</div> */}
                  <div className="text-green-600 dark:text-green-400">
                    {totalDecimal.toFixed(2)} দশমিক
                  </div>
                </div>

                {/* Verification message */}
                <div className="text-md text-center mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <span className="font-semibold">যাচাইকরণ:</span> সব অংশের
                  যোগফল = {totalShareSum.toFixed(6)} (১ হওয়া উচিত)
                </div>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-6 text-md border-t pt-4">
            <h4 className="font-semibold mb-2">প্রতীক নির্দেশিকা:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
              <div className="text-lg">
                <span className="font-bold">আনা:</span> ১=⁄, ২=৵, ৩=৶, ৪=৷,
                ৫=৷⁄, ৬=৷৵, ৭=৷৶, ৮=৷৷, ৯=৷৷⁄, ১০=৷৷৵, ১১=৷৷৶, ১২=৸, ১৩=৸⁄,
                ১৪=৸৵, ১৫=৸৶, ১৬=১্
              </div>
              <div className="text-lg">
                <span className="font-bold">কড়া:</span> ১=৷, ২=৷৷, ৩=৸
              </div>
              <div className="text-lg">
                <span className="font-bold">ক্রান্তি:</span> ১=৴, ২=৴৴
              </div>
            </div>
            <h4 className="font-semibold mb-2">ব্যবহার নির্দেশিকা:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>প্রথমে মোট জমির পরিমাণ দশমিকে দিন (যেমন: ১৫০ দশমিক)</li>
              <li>
                প্রতি মালিকের দলিল অনুযায়ী আনা-গন্ডা নির্বাচন করুন (প্রতীক সহ
                দেখতে পাবেন)
              </li>
              <li>&quot;হিস্যা বের করুন&quot; বাটনে ক্লিক করুন</li>
              <li>
                ফলাফলে দেখাবে:
                <ul className="list-circle list-inside ml-6 mt-1">
                  <li>অংশ (১ এর মধ্যে) - দশমিক সংখ্যায় (৬ দশমিক পর্যন্ত)</li>
                  <li>শতাংশ - মোট জমির কত শতাংশ</li>
                  <li>দশমিকে জমি - প্রকৃত জমির পরিমাণ দশমিকে</li>
                </ul>
              </li>
              <li className="font-semibold text-purple-600">
                সব অংশের যোগফল সবসময় ১ হবে
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
