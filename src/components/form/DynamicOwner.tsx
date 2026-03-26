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
import { Calculator, MinusCircle, PlusCircle } from 'lucide-react';
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
  linkedTo: string | null; // ID of the owner this owner is linked to
}

export function DynamicOwner() {
  const [totalDecimal, setTotalDecimal] = useState<number>(0); // মোট জমি দশমিকে (ডিফল্ট ০)
  const [totalLandInGonda, setTotalLandInGonda] = useState<number>(0); // মোট জমি গন্ডায়
  const [totalLandInTil, setTotalLandInTil] = useState<number>(0); // মোট জমি তিলে
  const [totalDecimalError, setTotalDecimalError] = useState<boolean>(false); // Error state for total decimal field

  const [owners, setOwners] = useState<Owner[]>([
    {
      id: crypto.randomUUID ? crypto.randomUUID() : `owner-${Date.now()}-1`,
      name: 'মালিক ১',
      landAmount: { ana: 0, gonda: 0, kora: 0, kranti: 0, til: 0 },
      shareValue: 0,
      percentage: 0,
      decimalValue: 0,
      linkedTo: null,
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

    // Clear error when user starts typing
    if (totalDecimalError) {
      setTotalDecimalError(false);
    }

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

          const updatedOwner = {
            ...owner,
            landAmount: normalized,
          };

          // If this owner is linked to others, update all linked owners
          return updatedOwner;
        }
        return owner;
      }),
    );

    // Update all owners that are linked to this owner
    setOwners((prev) => {
      const updatedOwners = [...prev];
      const sourceOwner = updatedOwners.find((o) => o.id === ownerId);

      if (sourceOwner) {
        // Find all owners that are linked to this owner (including those that link to this one)
        const linkedOwnerIds = updatedOwners
          .filter((o) => o.linkedTo === ownerId)
          .map((o) => o.id);

        // Update all linked owners with the same land amount
        linkedOwnerIds.forEach((linkedId) => {
          const index = updatedOwners.findIndex((o) => o.id === linkedId);
          if (index !== -1) {
            updatedOwners[index] = {
              ...updatedOwners[index],
              landAmount: { ...sourceOwner.landAmount },
            };
          }
        });
      }

      return updatedOwners;
    });

    setShowResult(false);
  };

  // Handle linking owner to previous owner
  const handleLinkOwner = (ownerId: string, previousOwnerId: string | null) => {
    setOwners((prev) => {
      const updatedOwners = [...prev];
      const currentOwnerIndex = updatedOwners.findIndex(
        (o) => o.id === ownerId,
      );
      const previousOwner = updatedOwners.find((o) => o.id === previousOwnerId);

      if (currentOwnerIndex !== -1) {
        if (previousOwnerId && previousOwner) {
          // Link to previous owner and copy their land amount
          updatedOwners[currentOwnerIndex] = {
            ...updatedOwners[currentOwnerIndex],
            linkedTo: previousOwnerId,
            landAmount: { ...previousOwner.landAmount },
          };
        } else {
          // Unlink
          updatedOwners[currentOwnerIndex] = {
            ...updatedOwners[currentOwnerIndex],
            linkedTo: null,
          };
        }
      }

      return updatedOwners;
    });

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
      linkedTo: null,
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
    // Check if total decimal is valid
    if (totalDecimal <= 0) {
      setTotalDecimalError(true);
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
    setTotalDecimalError(false);
  };

  // Reset calculator
  const resetCalculator = () => {
    setTotalDecimal(0);
    setTotalLandInGonda(0);
    setTotalLandInTil(0);
    setTotalDecimalError(false);
    setOwners([
      {
        id: crypto.randomUUID ? crypto.randomUUID() : `owner-${Date.now()}-1`,
        name: 'মালিক ১',
        landAmount: { ana: 0, gonda: 0, kora: 0, kranti: 0, til: 0 },
        shareValue: 0,
        percentage: 0,
        decimalValue: 0,
        linkedTo: null,
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

  // Get available previous owners for linking
  const getPreviousOwners = (currentOwnerId: string) => {
    const currentIndex = owners.findIndex((o) => o.id === currentOwnerId);
    return owners.slice(0, currentIndex);
  };

  return (
    <Card className="w-full border-none px-0 py-2 rounded-sm">
      <CardHeader className="py-0">
        <CardTitle className="bg-gray-200 rounded border border-gray-300 py-2 text-2xl text-amber-900 text-center flex items-center justify-center gap-2">
          আনা গন্ডা যৌথ মালিকের তফসিল ক্যালকুলেটর
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {/* Owners Section */}
          <div>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {owners.map((owner, index) => {
                const previousOwners = getPreviousOwners(owner.id);
                const isLinked = owner.linkedTo !== null;
                const linkedOwner = owners.find((o) => o.id === owner.linkedTo);

                return (
                  <div key={owner.id} className="border rounded p-2 bg-card">
                    <div className="gap-3">
                      <div className="space-y-0">
                        {/* Land Amount Input (আনা-গন্ডা with symbols) */}
                        <div className="">
                          <div className="flex justify-between items-center gap-2 bg-yellow-100 px-3 py-2 rounded">
                            {/* Owner Name and Link Option */}
                            <div className="flex items-center gap-2">
                              <Input
                                value={owner.name}
                                onChange={(e) =>
                                  handleOwnerNameChange(
                                    owner.id,
                                    e.target.value,
                                  )
                                }
                                size={25}
                                className="w-22 text-gray-800 bg-white focus-outline:none font-semibold"
                                placeholder="মালিকের নাম"
                                disabled={isLinked}
                              />

                              {/* Link Checkbox for owners that have previous owners */}
                              {previousOwners.length > 0 && (
                                <div className="flex items-center gap-2 text-end bg-gray-100 px-2 py-1 rounded">
                                  <input
                                    type="checkbox"
                                    id={`link-${owner.id}`}
                                    checked={isLinked}
                                    onChange={(e) => {
                                      if (
                                        e.target.checked &&
                                        previousOwners.length > 0
                                      ) {
                                        // When checking, link to the most recent previous owner by default
                                        const lastOwner =
                                          previousOwners[
                                            previousOwners.length - 1
                                          ];
                                        handleLinkOwner(owner.id, lastOwner.id);
                                      } else {
                                        // Unlink
                                        handleLinkOwner(owner.id, null);
                                      }
                                    }}
                                    className="rounded cursor-pointer"
                                  />
                                  <Label
                                    htmlFor={`link-${owner.id}`}
                                    className="text-sm cursor-pointer flex items-center gap-1"
                                  >
                                    {isLinked
                                      ? `${linkedOwner?.name} এর সমান অংশ`
                                      : ` আগের মালিকের সমান`}
                                  </Label>
                                </div>
                              )}
                            </div>

                            {/* আনা সিলেক্ট with symbols */}
                            <div className="flex justify-center items-center gap-2">
                              <Label
                                htmlFor={`owner-${owner.id}-ana`}
                                className="text-md text-gray-700 font-semibold"
                              >
                                আনা
                              </Label>
                              <Select
                                value={owner.landAmount?.ana.toString() || '0'}
                                onValueChange={(value) =>
                                  handleOwnerLandChange(owner.id, 'ana', value)
                                }
                                disabled={isLinked}
                              >
                                <SelectTrigger
                                  id={`owner-${owner.id}-ana`}
                                  className="h-8 w-20 rounded cursor-pointer"
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
                                className="text-md text-gray-700 font-semibold"
                              >
                                গন্ডা
                              </Label>
                              <Select
                                value={
                                  owner.landAmount?.gonda.toString() || '0'
                                }
                                onValueChange={(value) =>
                                  handleOwnerLandChange(
                                    owner.id,
                                    'gonda',
                                    value,
                                  )
                                }
                                disabled={isLinked}
                              >
                                <SelectTrigger
                                  id={`owner-${owner.id}-gonda`}
                                  className="h-8 w-20 rounded cursor-pointer"
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
                                className="text-md text-gray-700 font-semibold"
                              >
                                কড়া
                              </Label>
                              <Select
                                value={owner.landAmount?.kora.toString() || '0'}
                                onValueChange={(value) =>
                                  handleOwnerLandChange(owner.id, 'kora', value)
                                }
                                disabled={isLinked}
                              >
                                <SelectTrigger
                                  id={`owner-${owner.id}-kora`}
                                  className="h-8 w-20 rounded cursor-pointer"
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
                                className="text-md text-gray-700 font-semibold"
                              >
                                ক্রান্তি
                              </Label>
                              <Select
                                value={
                                  owner.landAmount?.kranti.toString() || '0'
                                }
                                onValueChange={(value) =>
                                  handleOwnerLandChange(
                                    owner.id,
                                    'kranti',
                                    value,
                                  )
                                }
                                disabled={isLinked}
                              >
                                <SelectTrigger
                                  id={`owner-${owner.id}-kranti`}
                                  className="h-8 w-20 rounded cursor-pointer"
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
                                className="text-md text-gray-700 font-semibold"
                              >
                                তিল
                              </Label>
                              <Select
                                value={owner.landAmount?.til.toString() || '0'}
                                onValueChange={(value) =>
                                  handleOwnerLandChange(owner.id, 'til', value)
                                }
                                disabled={isLinked}
                              >
                                <SelectTrigger
                                  id={`owner-${owner.id}-til`}
                                  className="h-8 w-20 rounded cursor-pointer"
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

                            <Button
                              onClick={() => removeOwner(owner.id)}
                              variant="ghost"
                              size="icon"
                              className="cursor-pointer rounded bg-red-500 hover:bg-red-800 text-white"
                              disabled={owners.length <= 1}
                            >
                              <MinusCircle className="h-6 w-6 text-white" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between bg-gray-100 mt-2 border border-gray-200 px-4 py-1 rounded">
              <h3 className="text-lg font-semibold">
                মালিকগণ ({owners.length} জন)
              </h3>
              <Button
                onClick={addOwner}
                className="text-md bg-gray-600 text-white font-semibold rounded cursor-pointer hover:bg-gray-900"
                size="lg"
              >
                <PlusCircle className="h-4 w-4" />
                নতুন মালিক যোগ করুন
              </Button>
            </div>
          </div>

          <div className="flex justify-evenly gap-2 bg-gray-100 border border-gray-200 my-2 p-2 rounded">
            <p className="text-lg">
              আনা ={' '}
              <span className="text-amber-600 text-md font-semibold">
                {totals.anaSum}
              </span>{' '}
            </p>
            <p className="text-lg">
              গন্ডা ={' '}
              <span className="text-amber-600 text-md font-semibold">
                {totals.gondaSum}
              </span>
            </p>
            <p className="text-lg">
              করা ={' '}
              <span className="text-amber-600 text-md font-semibold">
                {totals.koraSum}
              </span>
            </p>
            <p className="text-lg">
              ক্রান্তি ={' '}
              <span className="text-amber-600 text-md font-semibold">
                {totals.krantiSum}
              </span>
            </p>
            <p className="text-lg">
              তিল ={' '}
              <span className="text-amber-600 text-md font-semibold">
                {totals.tilSum}
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-0 px-4 py-1 bg-gray-100 border border-gray-200 rounded">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center gap-4">
                <Label
                  htmlFor="total-decimal"
                  className="text-xl whitespace-nowrap font-bold text-amber-600"
                >
                  মোট জমি: <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="total-decimal"
                  type="number"
                  step="0.01"
                  min="0"
                  value={totalDecimal || ''}
                  onChange={(e) => handleTotalDecimalChange(e.target.value)}
                  className={`w-32 rounded bg-white ${totalDecimalError ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
              </div>
              {totalDecimalError && (
                <p className="text-red-500 text-sm mt-1 ml-20">
                  * মোট জমির পরিমাণ প্রয়োজন
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={calculateDistribution}
                className="text-lg rounded bg-gray-600 font-bold cursor-pointer text-white hover:bg-gray-900"
                size="lg"
              >
                <Calculator className="h-4 w-4 mr-2" />
                হিস্যা বের করুন
              </Button>
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="text-lg rounded font-semibold text-black cursor-pointer bg-red-400 hover:bg-red-600 hover:text-white"
                size="lg"
              >
                রিসেট করুন
              </Button>
            </div>
          </div>

          {/* Summary Result */}
          {showResult && (
            <div className="mt-4 p-4 bg-yellow-100 rounded border border-gray-300">
              <h4 className="font-semibold rounded text-xl bg-gray-400 py-4 text-primary mb-4 flex justify-center">
                হিস্যার ফলাফল (সারসংক্ষেপ):
              </h4>
              <div className="space-y-3">
                <div className="text-lg grid grid-cols-3 gap-2 font-semibold border-b border-gray-300 pb-2">
                  <div>মালিকের নাম</div>
                  <div>অংশ (১ এর মধ্যে)</div>
                  <div>খতিয়ানে মালিকের জমির পরিমাণ</div>
                </div>
                {owners.map((owner) => (
                  <div
                    key={owner.id}
                    className="grid grid-cols-3 gap-2 text-sm border-b border-gray-300 last:border-0 pb-2 last:pb-0"
                  >
                    <div className="font-bold text-lg">{owner.name}</div>
                    <div className="text-lg text-red-600 font-bold dark:text-purple-400">
                      {owner.shareValue.toFixed(6)}
                    </div>
                    <div className="text-lg text-purple-600 font-bold dark:text-green-400">
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
          <div className="mt-2 text-md border border-gray-300 rounded p-2">
            <div>
              <h4 className="font-semibold mb-2 text-center bg-gray-200 p-2">
                নির্ধারিত মান
              </h4>
              <div className="grid grid-cols-3 gap-2 mb-0">
                <div className="text-lg bg-yellow-100 p-2 rounded">
                  <span className="font-bold">আনা:</span> ১=⁄, ২=৵, ৩=৶, ৪=৷,
                  ৫=৷⁄, ৬=৷৵, ৭=৷৶, ৮=৷৷, ৯=৷৷⁄, ১০=৷৷৵, ১১=৷৷৶, ১২=৸, ১৩=৸⁄,
                  ১৪=৸৵, ১৫=৸৶, ১৬=১্
                </div>
                <div className="text-lg bg-yellow-100 p-2 rounded">
                  <p className="font-bold">কড়া: ১=৷, ২=৷৷, ৩=৸</p>
                  <p className="font-bold">ক্রান্তি: ১=৴, ২=৴৴</p>
                </div>
                {/* info fo ana gonda */}
                <div className="text-md bg-yellow-100 p-2 rounded">
                  <ul className="list-disc list-inside space-y-1">
                    <li>১ আনা = ২০ গন্ডা</li>
                    <li>১ গন্ডা = ৪ কড়া</li>
                    <li>১ কড়া = ৩ ক্রান্তি</li>
                    <li>১ ক্রান্তি = ২০ তিল</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
