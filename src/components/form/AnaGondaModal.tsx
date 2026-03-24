// components/LandCalculatorModal.tsx
'use client';

import { AlertCircle, Calculator, PlusCircle, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Types
interface LandFraction {
  ana: number;
  gonda: number;
  kora: number;
  kranti: number;
  til: number;
}

interface OwnerFraction extends LandFraction {
  ownerName: string;
  id: string;
}

// Conversion constants
const CONVERSION = {
  ANA_TO_GONDA: 16,
  GONDA_TO_KORA: 5,
  KORA_TO_KRANTI: 6,
  KRANTI_TO_TIL: 4,

  TIL_PER_ANA: 16 * 5 * 6 * 4, // 1920
  TIL_PER_GONDA: 5 * 6 * 4, // 120
  TIL_PER_KORA: 6 * 4, // 24
  TIL_PER_KRANTI: 4, // 4
  TIL_PER_TIL: 1,
} as const;

// Symbols and options
const anaSymbols: Record<number, string> = {
  0: '০',
  1: '১',
  2: '২',
  3: '৩',
  4: '৪',
  5: '৫',
  6: '৬',
  7: '৭',
  8: '৮',
  9: '৯',
  10: '১০',
  11: '১১',
  12: '১২',
  13: '১৩',
  14: '১৪',
  15: '১৫',
  16: '১৬',
};

const gondaSymbols: Record<number, string> = {
  0: '০',
  1: '১',
  2: '২',
  3: '৩',
  4: '৪',
  5: '৫',
  6: '৬',
  7: '৭',
  8: '৮',
  9: '৯',
  10: '১০',
  11: '১১',
  12: '১২',
  13: '১৩',
  14: '১৪',
  15: '১৫',
};

const koraSymbols: Record<number, string> = {
  0: '০',
  1: '১',
  2: '২',
  3: '৩',
  4: '৪',
  5: '৫',
  6: '৬',
  7: '৭',
};

const krantiSymbols: Record<number, string> = {
  0: '০',
  1: '১',
  2: '২',
  3: '৩',
  4: '৪',
  5: '৫',
};

const tilSymbols: Record<number, string> = {
  0: '০',
  1: '১',
  2: '২',
  3: '৩',
  4: '৪',
};

// Options arrays
const anaOptions = Array.from({ length: 17 }, (_, i) => i);
const gondaOptions = Array.from({ length: 16 }, (_, i) => i);
const koraOptions = Array.from({ length: 8 }, (_, i) => i);
const krantiOptions = Array.from({ length: 6 }, (_, i) => i);
const tilOptions = Array.from({ length: 5 }, (_, i) => i);

// Utility function to convert fraction to total til
const fractionToTil = (fraction: LandFraction): number => {
  return (
    fraction.ana * CONVERSION.TIL_PER_ANA +
    fraction.gonda * CONVERSION.TIL_PER_GONDA +
    fraction.kora * CONVERSION.TIL_PER_KORA +
    fraction.kranti * CONVERSION.TIL_PER_KRANTI +
    fraction.til * CONVERSION.TIL_PER_TIL
  );
};

// Utility function to convert til to fraction
const tilToFraction = (totalTil: number): LandFraction => {
  const ana = Math.floor(totalTil / CONVERSION.TIL_PER_ANA);
  let remainder = totalTil % CONVERSION.TIL_PER_ANA;

  const gonda = Math.floor(remainder / CONVERSION.TIL_PER_GONDA);
  remainder = remainder % CONVERSION.TIL_PER_GONDA;

  const kora = Math.floor(remainder / CONVERSION.TIL_PER_KORA);
  remainder = remainder % CONVERSION.TIL_PER_KORA;

  const kranti = Math.floor(remainder / CONVERSION.TIL_PER_KRANTI);
  const til = remainder % CONVERSION.TIL_PER_KRANTI;

  return { ana, gonda, kora, kranti, til };
};

interface LandCalculatorModalProps {
  trigger?: React.ReactNode;
}

export function AnaGondaModal({ trigger }: LandCalculatorModalProps) {
  const [open, setOpen] = useState(false);
  const [owners, setOwners] = useState<OwnerFraction[]>([
    {
      id: '1',
      ownerName: '',
      ana: 0,
      gonda: 0,
      kora: 0,
      kranti: 0,
      til: 0,
    },
  ]);

  const addNewOwner = () => {
    const newId = (owners.length + 1).toString();
    setOwners([
      ...owners,
      {
        id: newId,
        ownerName: '',
        ana: 0,
        gonda: 0,
        kora: 0,
        kranti: 0,
        til: 0,
      },
    ]);
  };

  const removeOwner = (id: string) => {
    if (owners.length > 1) {
      setOwners(owners.filter((owner) => owner.id !== id));
    }
  };

  const updateOwner = (
    id: string,
    field: keyof LandFraction | 'ownerName',
    value: string | number,
  ) => {
    setOwners(
      owners.map((owner) => {
        if (owner.id === id) {
          return {
            ...owner,
            [field]: field === 'ownerName' ? value : Number(value),
          };
        }
        return owner;
      }),
    );
  };

  // Calculate total
  const totalTil = owners.reduce((sum, owner) => {
    return sum + fractionToTil(owner);
  }, 0);

  const totalFraction = tilToFraction(totalTil);

  // Check if total is 16 ana (1920 til = 16 * 120)
  const isCorrect = totalTil === 16 * CONVERSION.TIL_PER_GONDA;

  // Calculate difference if not correct
  const differenceTil = 16 * CONVERSION.TIL_PER_GONDA - totalTil;
  const differenceFraction = tilToFraction(Math.abs(differenceTil));

  const renderFractionSelect = (
    ownerId: string,
    field: keyof LandFraction,
    options: number[],
    symbols?: Record<number, string>,
    label: string,
  ) => {
    const owner = owners.find((o) => o.id === ownerId);
    if (!owner) return null;

    return (
      <div className="flex-1 min-w-[80px]">
        <Label className="text-xs mb-1 block">{label}</Label>
        <Select
          value={owner[field].toString()}
          onValueChange={(value) => updateOwner(ownerId, field, value)}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option} {symbols && `= ${symbols[option]}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Calculator className="h-4 w-4" />
            জমি ক্যালকুলেটর
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            জমি ভাগ ক্যালকুলেটর
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-full max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-4">
            {/* Owners Forms */}
            {owners.map((owner, index) => (
              <Card key={owner.id} className="p-4 relative">
                <div className="absolute right-2 top-2">
                  {owners.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOwner(owner.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-semibold">
                      মালিক {index + 1} {anaSymbols[index + 1]}
                    </Label>
                    <Input
                      placeholder="মালিকের নাম"
                      value={owner.ownerName}
                      onChange={(e) =>
                        updateOwner(owner.id, 'ownerName', e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {renderFractionSelect(
                      owner.id,
                      'ana',
                      anaOptions,
                      anaSymbols,
                      'আনা',
                    )}
                    {renderFractionSelect(
                      owner.id,
                      'gonda',
                      gondaOptions,
                      gondaSymbols,
                      'গন্ডা',
                    )}
                    {renderFractionSelect(
                      owner.id,
                      'kora',
                      koraOptions,
                      koraSymbols,
                      'কড়া',
                    )}
                    {renderFractionSelect(
                      owner.id,
                      'kranti',
                      krantiOptions,
                      krantiSymbols,
                      'ক্রান্তি',
                    )}
                    {renderFractionSelect(
                      owner.id,
                      'til',
                      tilOptions,
                      tilSymbols,
                      'তিল',
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {/* Add More Button */}
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={addNewOwner}
            >
              <PlusCircle className="h-4 w-4" />
              নতুন মালিক যোগ করুন
            </Button>

            {/* Results Section */}
            <Card className="p-4 bg-gray-50">
              <h3 className="font-semibold text-lg mb-3">সর্বমোট হিসাব</h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                <div>
                  <Label className="text-xs">আনা</Label>
                  <div className="text-xl font-bold">
                    {totalFraction.ana} {anaSymbols[totalFraction.ana]}
                  </div>
                </div>
                <div>
                  <Label className="text-xs">গন্ডা</Label>
                  <div className="text-xl font-bold">
                    {totalFraction.gonda} {gondaSymbols[totalFraction.gonda]}
                  </div>
                </div>
                <div>
                  <Label className="text-xs">কড়া</Label>
                  <div className="text-xl font-bold">
                    {totalFraction.kora} {koraSymbols[totalFraction.kora]}
                  </div>
                </div>
                <div>
                  <Label className="text-xs">ক্রান্তি</Label>
                  <div className="text-xl font-bold">
                    {totalFraction.kranti} {krantiSymbols[totalFraction.kranti]}
                  </div>
                </div>
                <div>
                  <Label className="text-xs">তিল</Label>
                  <div className="text-xl font-bold">
                    {totalFraction.til} {tilSymbols[totalFraction.til]}
                  </div>
                </div>
              </div>

              {isCorrect ? (
                <AlertCircle className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-700 font-medium">
                    ✓ সঠিক আছে! সর্বমোট ১৬ আনা হচ্ছে।
                  </AlertDescription>
                </AlertCircle>
              ) : (
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    {differenceTil > 0 ? (
                      <>
                        ❌ {differenceFraction.ana} আনা{' '}
                        {differenceFraction.gonda} গন্ডা{' '}
                        {differenceFraction.kora} কড়া{' '}
                        {differenceFraction.kranti} ক্রান্তি{' '}
                        {differenceFraction.til} তিল কম আছে
                      </>
                    ) : (
                      <>
                        ❌ {differenceFraction.ana} আনা{' '}
                        {differenceFraction.gonda} গন্ডা{' '}
                        {differenceFraction.kora} কড়া{' '}
                        {differenceFraction.kranti} ক্রান্তি{' '}
                        {differenceFraction.til} তিল বেশি আছে
                      </>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
