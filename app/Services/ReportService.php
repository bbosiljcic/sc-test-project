<?php

namespace App\Services;

use App\Models\Report;
use App\Repositories\ReportRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class ReportService
{
    /**
     * @var $reportRepository
     */
    protected $reportRepository;

    /**
     * ReportService constructor.
     *
     * @param ReportRepository $reportRepository
     */
    public function __construct(ReportRepository $reportRepository)
    {
        $this->reportRepository = $reportRepository;
    }

    /**
     * Delete one report by id.
     *
     * @param $id
     * @return String
     */
    public function deleteById($id)
    {
        DB::beginTransaction();

        try {
            $report = $this->reportRepository->delete($id);

        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Unable to delete report');
        }

        DB::commit();

        return $report;

    }

    /**
     * Get all reports.
     *
     * @return String
     */
    public function getAll()
    {
        return $this->reportRepository->getAll();
    }

    /**
     * Get one report by id.
     *
     * @param $id
     * @return String
     */
    public function getById($id)
    {
        return $this->reportRepository->getById($id);
    }

    /**
     * Update report data
     *
     * @param array $data
     * @return String
     */
    public function updateReport($data, $id)
    {
        $validator = Validator::make($data, [
            'title' => 'bail|min:2',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        DB::beginTransaction();

        try {
            $report = $this->reportRepository->update($data, $id);

        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Unable to update report');
        }

        DB::commit();

        return $report;

    }

    /**
     * Save report
     *
     * @param array $data
     * @return String
     */
    public function saveReportData($data)
    {
        $validator = Validator::make($data, [
            'title' => 'required',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        $result = $this->reportRepository->save($data);

        return $result;
    }

}