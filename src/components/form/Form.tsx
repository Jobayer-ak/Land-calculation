// components/AnagondaCalculator.tsx
'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Conversion factors
const GONDA_PER_ANA = 20;
const KORA_PER_GONDA = 4;
const KRANTI_PER_KORA = 3;
const TIL_PER_KRANTI = 20;
const PERCENTAGE_PER_GONDA = 1.9834655647383;

// Generate options for select fields
const anaOptions = Array.from({ length: 17 }, (_, i) => i); // 0-16
const gondaOptions = Array.from({ length: 20 }, (_, i) => i); // 0-19
const koraOptions = Array.from({ length: 4 }, (_, i) => i); // 0-3
const krantiOptions = Array.from({ length: 3 }, (_, i) => i); // 0-2
const tilOptions = Array.from({ length: 20 }, (_, i) => i); // 0-19

interface FormValues {
  ana: number;
  gonda: number;
  kora: number;
  kranti: number;
  til: number;
}

export function Form() {
  const [formValues, setFormValues] = useState<FormValues>({
    ana: 0,
    gonda: 0,
    kora: 0,
    kranti: 0,
    til: 0,
  });

  const [result, setResult] = useState<number | null>(null);

  const handleChange = (field: keyof FormValues, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: parseInt(value) || 0,
    }));
  };

  const calculatePercentage = () => {
    // Convert everything to til first
    const totalTil =
      formValues.ana *
        GONDA_PER_ANA *
        KORA_PER_GONDA *
        KRANTI_PER_KORA *
        TIL_PER_KRANTI +
      formValues.gonda * KORA_PER_GONDA * KRANTI_PER_KORA * TIL_PER_KRANTI +
      formValues.kora * KRANTI_PER_KORA * TIL_PER_KRANTI +
      formValues.kranti * TIL_PER_KRANTI +
      formValues.til;

    // Convert til to gonda
    const totalGonda =
      totalTil / (KORA_PER_GONDA * KRANTI_PER_KORA * TIL_PER_KRANTI);

    // Convert gonda to percentage
    const totalPercentage = totalGonda * PERCENTAGE_PER_GONDA;

    setResult(totalPercentage);
  };

  const resetForm = () => {
    setFormValues({
      ana: 0,
      gonda: 0,
      kora: 0,
      kranti: 0,
      til: 0,
    });
    setResult(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          আনা-গন্ডা ক্যালকুলেটর
        </CardTitle>
        <CardDescription className="text-center">
          নিচের ফর্মটি ব্যবহার করে আনা, গন্ডা, কড়া, ক্রান্তি ও তিল নির্বাচন
          করুন এবং শতাংশে রূপান্তর করুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 space-y-6">
          {/* Ana Field */}
          <div className="space-y-2">
            <Label htmlFor="ana" className="text-base font-semibold">
              আনা{' '}
              <span className="text-sm font-normal text-muted-foreground">
                (০-১৬)
              </span>
            </Label>
            <Select
              value={formValues.ana.toString()}
              onValueChange={(value) => handleChange('ana', value)}
            >
              <SelectTrigger id="ana" className="w-full">
                <SelectValue placeholder="আনা নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {anaOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option} আনা
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Gonda Field */}
          <div className="space-y-2">
            <Label htmlFor="gonda" className="text-base font-semibold">
              গন্ডা{' '}
              <span className="text-sm font-normal text-muted-foreground">
                (০-১৯)
              </span>
            </Label>
            <Select
              value={formValues.gonda.toString()}
              onValueChange={(value) => handleChange('gonda', value)}
            >
              <SelectTrigger id="gonda" className="w-full">
                <SelectValue placeholder="গন্ডা নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {gondaOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option} গন্ডা
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Kora Field */}
          <div className="space-y-2">
            <Label htmlFor="kora" className="text-base font-semibold">
              কড়া{' '}
              <span className="text-sm font-normal text-muted-foreground">
                (০-৩)
              </span>
            </Label>
            <Select
              value={formValues.kora.toString()}
              onValueChange={(value) => handleChange('kora', value)}
            >
              <SelectTrigger id="kora" className="w-full">
                <SelectValue placeholder="কড়া নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {koraOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option} কড়া
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Kranti Field */}
          <div className="space-y-2">
            <Label htmlFor="kranti" className="text-base font-semibold">
              ক্রান্তি{' '}
              <span className="text-sm font-normal text-muted-foreground">
                (০-২)
              </span>
            </Label>
            <Select
              value={formValues.kranti.toString()}
              onValueChange={(value) => handleChange('kranti', value)}
            >
              <SelectTrigger id="kranti" className="w-full">
                <SelectValue placeholder="ক্রান্তি নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {krantiOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option} ক্রান্তি
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Til Field */}
          <div className="space-y-2">
            <Label htmlFor="til" className="text-base font-semibold">
              তিল{' '}
              <span className="text-sm font-normal text-muted-foreground">
                (০-১৯)
              </span>
            </Label>
            <Select
              value={formValues.til.toString()}
              onValueChange={(value) => handleChange('til', value)}
            >
              <SelectTrigger id="til" className="w-full">
                <SelectValue placeholder="তিল নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {tilOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option} তিল
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Values Summary */}
          {/* <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium">নির্বাচিত মান:</p>
            <p className="text-sm">
              {formValues.ana} আনা {formValues.gonda} গন্ডা {formValues.kora}{' '}
              কড়া {formValues.kranti} ক্রান্তি {formValues.til} তিল
            </p>
          </div> */}

          {/* Action Buttons */}
          <div className="flex justify-between gap-3 mb-5">
            <Button
              onClick={calculatePercentage}
              className="flex-1 cursor-pointer text-black text-lg font-medium bg-amber-600 hover:bg-black hover:text-white"
            >
              শতাংশে রূপান্তর করুন
            </Button>
            <Button
              onClick={resetForm}
              variant="outline"
              className="flex-1 text-lg font-medium text-white bg-gray-600 hover:bg-green-600 cursor-pointer"
            >
              রিসেট করুন
            </Button>
          </div>

          {/* Result */}

          {result !== null && (
            <div className="mt-12 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <Label className="text-lg font-semibold text-primary">
                ফলাফল:
              </Label>
              <div className="text-3xl font-bold text-primary mt-2">
                {result.toFixed(6)} শতাংশ
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                = {formValues.ana} আনা {formValues.gonda} গন্ডা{' '}
                {formValues.kora} কড়া {formValues.kranti} ক্রান্তি{' '}
                {formValues.til} তিল
              </p>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-6 text-md text-muted-foreground border-t pt-4">
            <h4 className="font-semibold mb-2">স্মরণীয় সূত্র:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>১ আনা = ২০ গন্ডা</li>
              <li>১ গন্ডা = ৪ কড়া</li>
              <li>১ কড়া = ৩ ক্রান্তি</li>
              <li>১ ক্রান্তি = ২০ তিল</li>
              <li>১ গন্ডা = ১.৯৮৩৪৬৫৫৬৪৭৩৮৩ শতাংশ</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
